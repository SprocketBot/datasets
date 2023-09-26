import asyncio
import io
import os
import tarfile
import tempfile
from datetime import datetime

import duckdb
import markdown2
import requests
from jinja2 import Environment, FileSystemLoader, select_autoescape
from prefect import flow, task
from prefect.blocks.notifications import DiscordWebhook
from prefect.filesystems import RemoteFileSystem
from prefect.futures import resolve_futures_to_data
from prefect_dask import DaskTaskRunner
from typing_extensions import cast

from tasks.execute_and_upload_pg import execute_and_upload_pg
from utils.walk_dir import walk_dir

###
# Define Constants
###

s3_fs: RemoteFileSystem = cast(RemoteFileSystem, RemoteFileSystem.load("s3"))
discord_notify: DiscordWebhook = cast(DiscordWebhook, DiscordWebhook.load("frog-of-knowledge-alerts"))
dir_path = os.path.dirname(os.path.realpath(__file__))
query_path = os.path.join(dir_path, "..", "queries", "public")
assets_path = os.path.join(dir_path, "..", "assets")
bucket_name = s3_fs.basepath.split("/")[-1]


env = Environment(
    loader=FileSystemLoader(os.path.join(dir_path, "templates")),
    autoescape=select_autoescape(['html', 'xml'])
)

ddb = duckdb.connect(":memory:")


###
# Define Non-Task Helper Funcs
###


def handle_query(root: str, filename: str):
    if not filename.endswith(".sql"):
        return

    with open(os.path.join(root, filename), "r") as f:
        s3_prefix = root.replace(query_path, "")
        s3_path = "/".join([s3_prefix.rstrip("/"), filename.replace(".sql", ".parquet").lstrip("/")])
        return execute_and_upload_pg(f.read(), s3_path, s3_fs)

###
# Define flow-specific tasks
###

@task
def sync_static_assets():
    # TODO: Delete assets that no longer exist locally
    s3_fs.put_directory(assets_path, "assets")


@task
def build_summary_page(query_bucket_paths: list[str], url_prefix: str, archive_files: list[str]):
    query_metas = []

    for query_s3_path in query_bucket_paths:
        doc_path = os.path.join(query_path, query_s3_path.replace(".parquet", ".md").lstrip("/"))

        docs_exist = os.path.isfile(doc_path)

        if docs_exist:
            with open(doc_path, "r") as f:
                docs = markdown2.markdown(f.read())
        else:
            docs = "No information was provided about this dataset"

        table_ref = f"(SELECT * FROM read_parquet('{url_prefix}{query_s3_path}'))"
        schema = ddb.sql(f"DESCRIBE {table_ref};")
        sample = ddb.sql(f"SELECT * FROM {table_ref} LIMIT 5")
        glance = ddb.sql(f"SUMMARIZE {table_ref}")

        query_metas.append({
            "query_path": query_s3_path,
            "query_docs": docs,
            "schema": {"data": schema.fetchall(), "cols": schema.columns},
            "sample": {"data": sample.fetchall(), "cols": sample.columns},
            "glance": {"data": glance.fetchall(), "cols": glance.columns}
        })

    template = env.get_template("query_report.jinja.html")
    # We need to use a temp directory so the html mime-type is preserved
    # If we don't the URL is treated as a binary file and is downloaded instead of shown
    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, "summary.html"), "w") as f:
            f.write(template.render(public_url=url_prefix, traces=query_metas, archive_files=archive_files))

        s3_fs.put_directory(tmp_dir, "")


@task
def build_archive(query_paths: list[str], url_prefix: str):
    # Get a temp file for our tar
    with tempfile.NamedTemporaryFile() as tmp_file:
        # Write a tar to our temp file
        with tarfile.open(tmp_file.name, "w:gz") as tar:
            # Iterate through queries
            for q_path in query_paths:
                # Using an in-memory file; fetch all the parquet files and stick them into the tar
                with io.BytesIO() as mem_file:
                    mem_file.write(
                        requests.get(f"{url_prefix.rstrip('/')}/{q_path.lstrip('/')}").content
                    )
                    info = tarfile.TarInfo(name=q_path)
                    mem_file.seek(0)
                    info.size = len(mem_file.getvalue())
                    mem_file.seek(0)
                    tar.addfile(info, mem_file)

        now = datetime.now()
        date_string = now.strftime("%Y-%m-%d_%H-00")

        s3_fs.write_path("all-datasets.tar.gz", tmp_file.read())
        s3_fs.write_path(f"archives/{date_string}.tar.gz", tmp_file.read())

    return [
        f.replace(bucket_name, "").lstrip("/") for f in
        s3_fs.filesystem.ls(f"{bucket_name}/archives", False)
    ]

###
# Define Flow
###


@flow(name="Create Public Datasets", task_runner=DaskTaskRunner())
async def create_public_datasets(public_url_prefix: str = "https://f004.backblazeb2.com/file/sprocket-artifacts"):
    query_futures = walk_dir(query_path, handle_query)
    query_results = [r for r in await resolve_futures_to_data(query_futures) if r is not None]
    # Queries have all run
    # Now we need to build the summary page
    print(query_results)

    step_2_result = await resolve_futures_to_data([
        build_archive.submit(query_results, public_url_prefix),
        sync_static_assets.submit()
    ])

    archive_files: list[str] = step_2_result[0]

    build_summary_page.submit(
        query_results, public_url_prefix, archive_files
    )

    notify_string = f"""
    Public Datasets Updated 🔄🔄.
    Archive Point Created 💾💾.
    Updated the [Summary]({public_url_prefix}/summary.html) 📙📙.
    """
    await discord_notify.notify(notify_string)
    print(notify_string)


if __name__ == "__main__":
    asyncio.run(create_public_datasets())
