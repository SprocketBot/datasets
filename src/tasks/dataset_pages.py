import os
import tempfile

import duckdb
import frontmatter
import markdown2
from prefect import task
from prefect.filesystems import RemoteFileSystem

from jinja2 import Environment, FileSystemLoader, select_autoescape
import regex as re
import s3fs

from utils.PathManager import PathManager
from utils.constants import templates_path
from utils.merge_strings import merge_strings

env = Environment(
    loader=FileSystemLoader(os.path.join(templates_path, "sites/datasets")),
    autoescape=select_autoescape(["html", "xml"]),
)


def regex_replace(s, find, replace):
    """A non-optimal implementation of a regex filter"""
    return re.sub(find, replace, s)


env.filters['regex_replace'] = regex_replace


@task
async def build_dataset_page(
        parquet_bucket_path: str,
        csv_bucket_path: str,
        json_bucket_path: str,
        docs_path: str,
        base_url: str,
        pages_url: str,
        nav_elements: list[dict],
        bucket_prefix: str,
        path_manager: PathManager
):
    s3_fs: RemoteFileSystem = await RemoteFileSystem.load("s3")
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

    set_subpath = path_manager.remove_prefixes("/".join(parquet_bucket_path.split("/")[:-1]))
    set_name = ".".join(parquet_bucket_path.split("/")[-1].split(".")[:-1])

    parquet_url = merge_strings(base_url, parquet_bucket_path)
    csv_url = merge_strings(base_url, csv_bucket_path)
    json_url = merge_strings(base_url, json_bucket_path)

    table_ref = f"(SELECT * FROM read_parquet('{parquet_url}'))"
    schema = ddb.sql(f"DESCRIBE {table_ref};")
    sample = ddb.sql(f"SELECT * FROM {table_ref} LIMIT 5")
    summary = ddb.sql(f"SUMMARIZE {table_ref}")

    page_content = query_page_template.render(
        dataset_name=set_name,
        docs=docs,
        parquet_url=parquet_url,
        csv_url=csv_url,
        json_url=json_url,
        base_url=base_url,
        frontmatter=fm,
        nav_elements=nav_elements,
        glance={
            "schema": {"data": schema.fetchall(), "cols": schema.columns},
            "sample": {"data": sample.fetchall(), "cols": sample.columns},
            "summary": {"data": summary.fetchall(), "cols": summary.columns},
        },
        pages_url=pages_url
    )

    set_path = "/".join([*bucket_prefix.split("/"), *set_subpath.split("/")])
    print(bucket_prefix, set_subpath, set_path)

    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, f"{set_name}.html"), "w") as f:
            f.write(page_content)
        await s3_fs.put_directory(tmp_dir, set_path)

    return


@task
async def build_index_page(nav_elements: list[dict], path_manager: PathManager):
    s3_fs: RemoteFileSystem = await RemoteFileSystem.load("s3")
    index_page_template = env.get_template("index.jinja.html")
    page_content = index_page_template.render(
        pages_url=path_manager.pages_path("http"), nav_elements=nav_elements
    )

    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, "index.html"), "w") as f:
            f.write(page_content)
        await s3_fs.put_directory(tmp_dir, path_manager.pages_path())


@task
async def build_archive_page(nav_elements: list[dict], path_manager: PathManager):
    # Get S3 filesystem block
    s3_fs = await RemoteFileSystem.load("s3")

    # Build a s3fs based on the settings from the block
    # s3fs has more functionality and is closer to what we need
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get('client_kwargs')['endpoint_url'],
        secret=s3_fs.settings.get('secret'),
        key=s3_fs.settings.get('key'),
    )

    archives = fs.glob(path_manager.archives_glob())

    archive_items = [
        {
            "href": path_manager.archive_path(path_manager.remove_prefixes(a)),
            "title": a.split("/")[-1],
        }
        for a in archives
    ]

    archive_page_template = env.get_template("archive.jinja.html")
    page_content = archive_page_template.render(
        pages_url=path_manager.pages_path("http"),
        nav_elements=nav_elements,
        archives=archive_items,
    )
    with tempfile.TemporaryDirectory() as tmp_dir:
        with open(os.path.join(tmp_dir, "archive.html"), "w") as f:
            f.write(page_content)
        await s3_fs.put_directory(tmp_dir, path_manager.pages_path())
