from prefect import task
from prefect.filesystems import RemoteFileSystem
import s3fs

@task
async def delete_s3_path(path: str):
    # Get S3 filesystem block
    s3_fs = await RemoteFileSystem.load("s3")

    # Build a s3fs based on the settings from the block
    # s3fs has more functionality and is closer to what we need
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get('client_kwargs')['endpoint_url'],
        secret=s3_fs.settings.get('secret'),
        key=s3_fs.settings.get('key'),
    )

    try:
        fs.rm(path, recursive=True)
    except FileNotFoundError:
        pass
