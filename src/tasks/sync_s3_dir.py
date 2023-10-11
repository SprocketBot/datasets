import s3fs
from prefect import task
from prefect.filesystems import RemoteFileSystem


@task
async def sync_s3_dir(bucket_name: str, bucket_path: str, local_path: str):
    s3_fs = await RemoteFileSystem.load("s3")
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get("client_kwargs")["endpoint_url"],
        secret=s3_fs.settings.get("secret"),
        key=s3_fs.settings.get("key"),
    )
    try:
        fs.rm(f"{bucket_name}/{bucket_path}", recursive=True)
    except FileNotFoundError:
        pass

    print(
        f"{await s3_fs.put_directory(local_path, bucket_path)} synced"
    )
