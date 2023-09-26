import os
import shutil
import time
from datetime import datetime

from jinja2 import Environment, FileSystemLoader, select_autoescape
import duckdb
import markdown2
from prefect import flow, task
from prefect.filesystems import RemoteFileSystem
from prefect.blocks.notifications import DiscordWebhook
from prefect.futures import PrefectFuture
from prefect_dask.task_runners import DaskTaskRunner
import tarfile

from tasks.exec_postgres import exec_pg
from tasks.to_parquet_file import to_parquet_file


s3_fs: RemoteFileSystem = RemoteFileSystem.load("s3")
s3_root_path = "public"
discord_notify: DiscordWebhook = DiscordWebhook.load("frog-of-knowledge-alerts")

dir_path = os.path.dirname(os.path.realpath(__file__))

env = Environment(
    loader=FileSystemLoader(os.path.join(dir_path, "templates")),
    autoescape=select_autoescape(['html', 'xml'])
)

ddb = duckdb.connect(":memory:")


def execute_query_file(query_file: str, bucket_prefix: str):
    if not query_file:
        raise Exception("Missing required parameter 'query_file'")

    with open(query_file, "r") as f:
        query = f.read()

    bucket_path = f"{bucket_prefix}/{query_file.split('/')[-1].replace('sql', 'parquet')}"

    pg_result_future = exec_pg.submit(query, bucket_path)

    write_file_future = to_parquet_file.submit(bucket_path, pg_result_future)

    return write_file_future


def execute_query_dir(root_dir) -> list[PrefectFuture]:
    queries_dir = os.path.join(dir_path, "..", "queries", "public", root_dir)
    queries = os.listdir(queries_dir)

    query_futures = []
    for query in queries:
        is_directory = os.path.isdir(os.path.join(queries_dir, query))
        if is_directory:
            # Use .fn to prevent spawning subflows when not needed
            query_futures.extend(execute_query_dir(query))
            continue
        if not query.endswith(".sql"):
            if not query.endswith(".md"):
                print(f"Found non-sql file {query}, will not execute")
            continue

        md_file_name = ".".join(query.split(".")[:-1]) + ".md"
        md_file_path = os.path.join(queries_dir, md_file_name)
        if os.path.isfile(md_file_path):
            with (open(md_file_path, "r") as f):
                doc = markdown2.markdown(f.read(), extras=["fenced-code-blocks"])
        else:
            doc = "No information was given about this table."

        s3_prefix = "/".join([i for i in ["test", root_dir] if i])
        query_futures.append(
            build_trace(execute_query_file(os.path.join(queries_dir, query), s3_prefix), doc)
        )

    return query_futures


@task(task_run_name="build-trace-{result}")
def build_trace(result: str, doc: str):
    print("Appended Trace")
    table_ref = f"(SELECT * FROM read_parquet('{result}'))"
    schema = ddb.sql(f"DESCRIBE {table_ref};")
    sample = ddb.sql(f"SELECT * FROM {table_ref} LIMIT 5")
    glance = ddb.sql(f"SUMMARIZE {table_ref}")

    output = {
        "query_path": f"{result.replace('sql', 'parquet')}",
        "query_docs": doc,
        "schema": {"data": schema.fetchall(), "cols": schema.columns},
        "sample": {"data": sample.fetchall(), "cols": sample.columns},
        "glance": {"data": glance.fetchall(), "cols": glance.columns}
    }

    with open(f"{result}", 'rb') as f:
        s3_fs.write_path(f"{result}", f.read())

    os.remove(result)

    return output


@task
def build_and_upload(traces: list[dict]):
    bucket_url = "https://f004.backblazeb2.com/file/sprocket-artifacts/"

    template = env.get_template("query_report.jinja.html")

    os.makedirs(f"./{s3_root_path}", exist_ok=True)

    with open(f"{s3_root_path}/summary.html", "w") as f:
        f.write(template.render(traces=traces, bucket_url=bucket_url))

    now = datetime.now()
    date_string = now.strftime("%Y-%m-%d_%H-00")

    os.makedirs(f"./{s3_root_path}/archive", exist_ok=True)
    current_filename = f"./{s3_root_path}/sprocket-public-datasets.tar.gz"
    stamped_filename = f"./{s3_root_path}/archive/sprocket-public-datasets-{date_string}.tar.gz"

    with tarfile.open(current_filename, "w:gz") as tar:
        for root, dirs, files in os.walk(f"./{s3_root_path}"):
            for file in files:
                if file.endswith(".parquet"):
                    full_file_path = os.path.join(root, file)
                    tar.add(full_file_path, arcname=os.path.relpath(full_file_path, f"./{s3_root_path}"))

    shutil.copy(current_filename,stamped_filename)
    shutil.copytree("./assets", f"./{s3_root_path}/assets", dirs_exist_ok=True)

    s3_fs.put_directory(s3_root_path, s3_root_path, overwrite=True)
    shutil.rmtree(s3_root_path)


@flow(name="Execute Public Queries", log_prints=True,
      task_runner=DaskTaskRunner()
      )
def execute_public_queries(root_dir=""):
    start = time.time()
    traces = execute_query_dir(root_dir)
    end_queries = time.time()

    build_and_upload.submit(traces)

    end_uploads = time.time()

    notify_string = f"""
    Refreshed public datasets! ([Summary](https://f004.backblazeb2.com/file/sprocket-artifacts/public/summary.html))
    
    Queries took {end_queries - start} seconds
    Uploads took {end_uploads - end_queries} seconds
    Total Time: {end_uploads - start} seconds
"""
    # discord_notify.notify(notify_string)
    print(notify_string)

if __name__ == "__main__":
    execute_public_queries()
