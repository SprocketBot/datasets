import os
import shutil

import markdown2
import requests
from prefect import flow
from execute_query_file import execute_query_file
from prefect.artifacts import create_markdown_artifact
from prefect.filesystems import RemoteFileSystem
from prefect.blocks.notifications import DiscordWebhook

remote_file_system_block = RemoteFileSystem.load("s3")
discord_webhook_block = DiscordWebhook.load("frog-of-knowledge-alerts")


@flow(name="Execute Public Queries", log_prints=True)
def execute_public_queries(root_dir="", traces: list[dict] = None):
    if traces is None:
        top_exec = True
        traces = []
    else:
        top_exec = False
    dir_path = os.path.dirname(os.path.realpath(__file__))
    queries_dir = os.path.join(dir_path, "..", "queries", "public", root_dir)
    queries = os.listdir(queries_dir)

    for query in queries:
        print(query)
        is_directory = os.path.isdir(os.path.join(queries_dir, query))
        if is_directory:
            # Use .fn to prevent spawning subflows when not needed
            execute_public_queries.fn(query)
            continue
        if not query.endswith(".sql"):
            print(f"Found non-sql file {query}, will not execute")
            continue

        md_file_name = ".".join(query.split(".")[:-1]) + ".md"
        md_file_path = os.path.join(queries_dir, md_file_name)
        if os.path.isfile(md_file_path):
            with open(md_file_path, "r") as f:
                doc = f.read()
        else:
            doc = "No information was given about this table."

        s3_prefix = "/".join([i for i in ["public", root_dir] if i])
        execute_query_file(os.path.join(queries_dir, query), s3_prefix, False)
        traces.append({
            "query_path": f"{s3_prefix}/{query.replace('sql', 'parquet')}",
            "query_docs": doc
        })

        # We only want to proceed if this was the original function
        if not top_exec: return

        # TOOD: This should be a task
        bucket_url = "https://f004.backblazeb2.com/file/sprocket-artifacts/"
        new_line = "\n"
        query_docs = new_line.join([f"""
## [{q['query_path']}]({bucket_url}{q['query_path']})

{q['query_docs']}

Try Me:

```sql
SELECT * 
FROM 
    read_parquet('{bucket_url}{q['query_path']}');
```

""" for q in traces])

        doc_content = f"""
# Sprocket Datasets

This document outlines a list of available datasets produced from Sprocket's database.
There is information about players, teams, and games included here.

You can being exploring this data with the [DuckDB Web Console](https://shell.duckdb.org/)

---

{query_docs}
"""
        create_markdown_artifact(doc_content, "written-files")
        doc_as_html = markdown2.markdown(doc_content, extras=["fenced-code-blocks"])
        doc_as_html = f"""
{doc_as_html}
<link rel="stylesheet" type="text/css" href="{bucket_url}public/styles/highlight.css"/>
<link rel="stylesheet" type="text/css" href="{bucket_url}public/styles/styles.css"/>
        """

        os.makedirs("public/styles", exist_ok=True)

        with open("public/styles/highlight.css", "w") as f:
            highlightCss = requests.get("https://raw.githubusercontent.com/richleland/pygments-css/master/manni.css")
            highlightCss.raise_for_status()
            f.write(highlightCss.text.replace("highlight", "codehilite"))

        with open("public/styles/styles.css", "w") as f:
            style_url = "https://raw.githubusercontent.com/markdowncss/retro/master/css/retro.css"
            css = requests.get(style_url)
            css.raise_for_status()
            f.write(css.text)


        with open("public/summary.html", "w") as f:
            f.write(doc_as_html)

        remote_file_system_block.put_directory("public", "public", overwrite=True)
        shutil.rmtree("public")

        discord_webhook_block.notify(
            "Refreshed public datasets! ([Summary](https://f004.backblazeb2.com/file/sprocket-artifacts/public/summary.html)) ")


if __name__ == "__main__":
    execute_public_queries()
