import sys
import os
import tempfile

import markdown2
import frontmatter
import duckdb
import s3fs

from prefect import flow, task
from prefect_dask import DaskTaskRunner

from prefect.filesystems import RemoteFileSystem
from typing import cast

sys.path.append(
    os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        "..",
        ".."
    )
)
from src.utils.constants import *
from src.utils.jinja import env

s3_fs: RemoteFileSystem = cast(RemoteFileSystem, RemoteFileSystem.load("s3"))


@task
def build_dataset_page(
        bucket_path: str, docs_path: str, base_url: str, nav_elements: list[dict]
):
    ddb = duckdb.connect(":memory:")
    if os.path.isfile(docs_path):
        with open(docs_path, "r") as f:
            raw_docstr = f.read().strip()
            if frontmatter.checks(raw_docstr):
                # Has frontmatter
                fm = frontmatter.loads(raw_docstr)
                docs = markdown2.markdown(fm.content)
            else:
                fm = {}
                docs = markdown2.markdown(raw_docstr)
    else:
        fm = {}
        docs = None

    query_page_template = env.get_template("[query_name].jinja.html")

    set_name = ".".join(bucket_path.split("/")[-1].split(".")[:-1])
    parquet_url = f"{base_url.rstrip(bucket_name).strip('/')}/{bucket_path.strip('/')}"

    table_ref = f"(SELECT * FROM read_parquet('{parquet_url}'))"
    schema = ddb.sql(f"DESCRIBE {table_ref};")
    sample = ddb.sql(f"SELECT * FROM {table_ref} LIMIT 5")
    summary = ddb.sql(f"SUMMARIZE {table_ref}")

    page_content = query_page_template.render(
        dataset_name=set_name,
        docs=docs,
        parquet_url=parquet_url,
        base_url=base_url,
        frontmatter=fm,
        nav_elements=nav_elements,
        glance={
            "schema": {"data": schema.fetchall(), "cols": schema.columns},
            "sample": {"data": sample.fetchall(), "cols": sample.columns},
            "summary": {"data": summary.fetchall(), "cols": summary.columns},
        },
    )

    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, f"{set_name}.html"), "w") as f:
            f.write(page_content)
        s3_fs.put_directory(tmp_dir, "public")

    return


@task
def build_index_page(base_url: str, nav_elements: list[dict]):
    index_page_template = env.get_template("index.jinja.html")
    page_content = index_page_template.render(
        base_url=base_url, nav_elements=nav_elements
    )
    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, "index.html"), "w") as f:
            f.write(page_content)
        s3_fs.put_directory(tmp_dir, "public")


@task
async def build_archive_page(base_url: str, nav_elements: list[dict]):
    bucket_name = await get_bucket_name()
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get("client_kwargs")["endpoint_url"],
        secret=s3_fs.settings.get("secret"),
        key=s3_fs.settings.get("key"),
    )
    archives = fs.glob(f"{bucket_name}/archives/**/*.tar.gz")

    archive_items = [
        {
            "href": a.replace(bucket_name, ""),
            "title": a.split("/")[-1],
        }
        for a in archives
    ]

    archive_page_template = env.get_template("archive.jinja.html")
    page_content = archive_page_template.render(
        base_url=base_url,
        nav_elements=nav_elements,
        archives=archive_items,
    )
    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, "archive.html"), "w") as f:
            f.write(page_content)
        s3_fs.put_directory(tmp_dir, "public")


@task
async def sync_static_assets():
    bucket_name = get_bucket_name()
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get("client_kwargs")["endpoint_url"],
        secret=s3_fs.settings.get("secret"),
        key=s3_fs.settings.get("key"),
    )
    try:
        fs.rm(f"{bucket_name}/public/assets", recursive=True)
    except FileNotFoundError:
        pass

    # TODO: Delete assets that no longer exist locally
    s3_fs.put_directory(assets_path, "public/assets")


@flow(name="build-doc-site", task_runner=DaskTaskRunner())
async def build_dataset_site(
        base_url="https://f004.backblazeb2.com/file/sprocket-artifacts",
        sync_assets=True,
        rebuild_pages=True,
        rebuild_index=True,
        rebuild_archive_page=True
):
    bucket_name = get_bucket_name()
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get("client_kwargs")["endpoint_url"],
        secret=s3_fs.settings.get("secret"),
        key=s3_fs.settings.get("key"),
    )
    data_files = fs.glob(f"{bucket_name}/{bucket_data_prefix}/**/*.parquet")

    nav_elements = [
        {
            "href": f"{base_url}/public/{'.'.join(datum.split('/')[-1].split('.')[:-1])}.html",
            "title": ".".join(datum.split("/")[-1].split(".")[:-1]),
        }
        for datum in data_files
    ]

    if sync_assets:
        sync_static_assets.submit()

    if rebuild_archive_page:
        build_archive_page.submit(base_url=base_url, nav_elements=nav_elements)

    if rebuild_index:
        build_index_page.submit(base_url=base_url, nav_elements=nav_elements)

    if rebuild_pages:
        for data_file in data_files:
            build_dataset_page.submit(
                bucket_path=data_file,
                docs_path=os.path.join(
                    query_path,
                    data_file.replace(
                        f"{bucket_name}/{bucket_data_prefix}/", ""
                    ).replace(".parquet", ".md"),
                ),
                base_url=base_url,
                nav_elements=nav_elements,
            )
    return f"{base_url}/public/index.html"


if __name__ == "__main__":
    build_dataset_site(
        rebuild_pages="--rebuild-pages" in sys.argv,
        sync_assets="--sync-assets" in sys.argv,
        rebuild_index="--rebuild-index" in sys.argv,
        rebuild_archive_page="--rebuild-archive" in sys.argv
    )
