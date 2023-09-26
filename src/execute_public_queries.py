import os
import shutil
import time

from jinja2 import Environment, FileSystemLoader, select_autoescape
import duckdb
import markdown2
import requests
from prefect import flow
from execute_query_file import execute_query_file
from prefect.artifacts import create_markdown_artifact
from prefect.filesystems import RemoteFileSystem
from prefect.blocks.notifications import DiscordWebhook

remote_file_system_block: RemoteFileSystem = RemoteFileSystem.load("s3")
discord_webhook_block: DiscordWebhook = DiscordWebhook.load("frog-of-knowledge-alerts")

dir_path = os.path.dirname(os.path.realpath(__file__))

env = Environment(
    loader=FileSystemLoader(os.path.join(dir_path, "templates")),
    autoescape=select_autoescape(['html', 'xml'])
)

ddb = duckdb.connect(":memory:")


def execute_query_dir(root_dir, traces: list[dict]):
    queries_dir = os.path.join(dir_path, "..", "queries", "public", root_dir)
    queries = os.listdir(queries_dir)

    for query in queries:
        print(query)
        is_directory = os.path.isdir(os.path.join(queries_dir, query))
        if is_directory:
            # Use .fn to prevent spawning subflows when not needed
            execute_query_dir(query, traces)
            continue
        if not query.endswith(".sql"):
            print(f"Found non-sql file {query}, will not execute")
            continue

        md_file_name = ".".join(query.split(".")[:-1]) + ".md"
        md_file_path = os.path.join(queries_dir, md_file_name)
        if os.path.isfile(md_file_path):
            with (open(md_file_path, "r") as f):
                doc = markdown2.markdown(f.read(), extras=["fenced-code-blocks"])
        else:
            doc = "No information was given about this table."

        s3_prefix = "/".join([i for i in ["public", root_dir] if i])
        query_path = execute_query_file(os.path.join(queries_dir, query), s3_prefix, False)

        table_ref = f"(SELECT * FROM read_parquet('{query_path}'))"

        schema = ddb.sql(f"DESCRIBE {table_ref};")
        sample = ddb.sql(f"SELECT * FROM {table_ref} LIMIT 5")
        glance = ddb.sql(f"SUMMARIZE {table_ref}")

        traces.append({
            "query_path": f"{s3_prefix}/{query.replace('sql', 'parquet')}",
            "query_docs": doc,
            "schema": {"data": schema.fetchall(), "cols": schema.columns},
            "sample": {"data": sample.fetchall(), "cols": sample.columns},
            "glance": {"data": glance.fetchall(), "cols": glance.columns}
        })

    # https://f004.backblazeb2.com/file/sprocket-artifacts/public/assets/favicons/favicon.ico
    # https://f004.backblazeb2.com/file/sprocket-artifacts/public/assets/favicon/favicon.ico



@flow(name="Execute Public Queries", log_prints=True)
def execute_public_queries(root_dir=""):
    traces: list[dict] = []

    start = time.time()
    execute_query_dir(root_dir, traces)
    end_queries = time.time()

    # TODO: This should be a task
    bucket_url = "https://f004.backblazeb2.com/file/sprocket-artifacts/"

    template = env.get_template("query_report.jinja.html")

    with open("public/summary.html", "w") as f:
        f.write(template.render(traces=traces, bucket_url=bucket_url))

    shutil.copytree("./assets", "./public/assets", dirs_exist_ok=True)

    remote_file_system_block.put_directory("public", "public", overwrite=True)
    end_uploads = time.time()
    shutil.rmtree("public")

    discord_webhook_block.notify(f"""
    Refreshed public datasets! ([Summary](https://f004.backblazeb2.com/file/sprocket-artifacts/public/summary.html))
    
    Queries took {end_queries - start} seconds
    Uploads took {end_uploads - end_queries} seconds
    Total Time: {end_uploads - start} seconds
""")


if __name__ == "__main__":
    execute_public_queries()
