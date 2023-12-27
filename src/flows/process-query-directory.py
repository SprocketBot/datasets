import json

import s3fs
from prefect import flow
from prefect.blocks.notifications import DiscordWebhook
from prefect.filesystems import RemoteFileSystem
from prefect.futures import resolve_futures_to_data
from prefect_dask import DaskTaskRunner

import asyncio
import os
import sys

###
# Add directory to the python path to simplify life
###
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))

from tasks.sync_s3_dir import sync_s3_dir
from tasks.dataset_pages import build_index_page, build_dataset_page, build_archive_page
from tasks.execute_and_upload_pg import execute_and_upload_pg
from tasks.delete_s3_path import delete_s3_path
from tasks.archive_s3_glob import archive_s3_glob
from utils.PathManager import PathManager
from utils.bucket_paths import extract_bucket_name
from utils.constants import root_query_path, assets_path
from utils.walk_dir import walk_dir_async


@flow(
    log_prints=True,
    name="Publish Data",
    flow_run_name="{subdir} queries",
    task_runner=DaskTaskRunner(cluster_kwargs={"memory_limit": "0.95"}),
    description="Executes all queries in {subdir}, publishes them to S3 compatible storage, and constructs a "
    + "documentation site based on the provided markdown with examples",
)
async def process_query_directory(
    subdir="public",
    public_url_root="https://f004.backblazeb2.com/file/sprocket-artifacts",
    refresh_parquet=True,
    create_archive=True,
    build_pages=True,
):
    # this is needed for bucket pathing information.
    # this was originally built with B2, which uses path-style S3 instead of subdomains
    s3_fs = await RemoteFileSystem.load("s3")
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get("client_kwargs")["endpoint_url"],
        secret=s3_fs.settings.get("secret"),
        key=s3_fs.settings.get("key"),
    )

    ###
    # Get paths for this subdir
    ###
    bucket_name = extract_bucket_name(s3_fs.basepath)
    flow_path_manager = PathManager(
        public_url_root=public_url_root, bucket_name=bucket_name, namespace=subdir
    )
    query_path = os.path.join(root_query_path, subdir)

    data_futures = []
    if refresh_parquet:
        ###
        # Cleanup
        ###
        delete_future = await delete_s3_path.submit(flow_path_manager.data_path())

        ###
        # Execute all queries
        ###
        data_futures = await walk_dir_async(
            query_path,
            handle_query,
            ns=subdir,
            data_path=flow_path_manager.data_path(),
            wait_for=[delete_future],
        )

    archive_future = None
    if create_archive:
        ###
        # Create Archive
        ###
        archive_paths = flow_path_manager.get_archives_paths()
        archive_future = await archive_s3_glob.submit(
            flow_path_manager.parquet_glob(),
            [archive_paths["current"], archive_paths["dated"]],
            wait_for=data_futures,
        )

    ###
    # Create documentation site!
    ###

    if build_pages:
        data_files = fs.glob(flow_path_manager.parquet_glob())

        pathless_files = [flow_path_manager.remove_prefixes(p) for p in data_files]
        manifest = {}
        for pathless_file in pathless_files:
            parts = pathless_file.split("/")
            filename = ".".join(parts[-1].split(".")[:-1])
            t = manifest
            for part in parts[:-1]:
                if part not in t:
                    t[part] = {}
                t = t[part]
            t[filename] = flow_path_manager.parquet_path(pathless_file, "http")

        print(manifest)
        with open(os.path.join(assets_path, "manifest.json"), "w") as f:
            f.write(json.dumps(manifest))

        nav_elements = [
            {
                "href": flow_path_manager.get_page_url_from_parquet(datum),
                "title": ".".join(datum.split("/")[-1].split(".")[:-1]),
                "prefix": " ".join(
                    flow_path_manager.remove_prefixes(datum).split("/")[:-1]
                ),
            }
            for datum in data_files
        ]

        index_future = await build_index_page.submit(
            nav_elements=nav_elements,
            path_manager=flow_path_manager,
            wait_for=data_futures,
        )

        data_page_futures = [
            await build_dataset_page.submit(
                parquet_bucket_path=data_file,
                csv_bucket_path=flow_path_manager.change_file_extension(
                    data_file, "csv"
                ),
                json_bucket_path=flow_path_manager.change_file_extension(
                    data_file, "json"
                ),
                docs_path=os.path.join(
                    query_path,
                    flow_path_manager.change_file_extension(
                        flow_path_manager.remove_prefixes(data_file), "md"
                    ),
                ),
                nav_elements=nav_elements,
                bucket_prefix=flow_path_manager.pages_path("s3"),
                base_url=flow_path_manager.public_url_root,
                pages_url=flow_path_manager.pages_path("http"),
                path_manager=flow_path_manager,
                wait_for=data_futures,
            )
            for data_file in data_files
        ]

        archive_future = await build_archive_page.submit(
            nav_elements=nav_elements,
            path_manager=flow_path_manager,
            wait_for=archive_future,
        )

        assets_future = await sync_s3_dir.submit(
            bucket_name=flow_path_manager.bucket_name,
            bucket_path=flow_path_manager.page_path("assets", "s3"),
            local_path=assets_path,
        )

        page_futures = [assets_future, index_future, archive_future] + data_page_futures
        await resolve_futures_to_data(page_futures)

    discord_notify = await DiscordWebhook.load("frog-of-knowledge-alerts")
    notify_string = f"""
    🔄| Public Datasets Updated |🔄.
    💾| Archive Point Created |💾.
    📙| Updated the [Book]({flow_path_manager.pages_path("http")}/index.html) |📙.
    """
    if subdir != "test":
        await discord_notify.notify(notify_string)
    print(notify_string)


async def handle_query(root: str, filename: str, ns: str, data_path: str, wait_for):
    if not filename.endswith(".sql"):
        return

    s3_fs = await RemoteFileSystem.load("s3")

    with open(os.path.join(root, filename), "r") as f:
        # Remove the root query path from the root var
        # Then attempt to remove the namespace
        relative_path = root.split(ns)[-1].strip("/")

        slugs = [data_path, relative_path, filename.replace(".sql", "").strip("/")]
        s3_path = "/" + "/".join(
            [slug for slug in slugs if slug is not None and slug != ""]
        )
        return execute_and_upload_pg.submit(f.read(), s3_path, s3_fs, wait_for=wait_for)


if __name__ == "__main__":
    asyncio.run(
        process_query_directory(
            subdir="test", build_pages=True, refresh_parquet=False, create_archive=False
        )
    )
