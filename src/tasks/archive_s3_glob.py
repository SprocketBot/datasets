import io
import tarfile

from prefect import task
import s3fs
import tempfile

from prefect.filesystems import RemoteFileSystem


@task()
async def archive_s3_glob(glob: str, outpaths: list[str]):
    # Get S3 filesystem block
    s3_fs = await RemoteFileSystem.load("s3")

    # Build a s3fs based on the settings from the block
    # s3fs has more functionality and is closer to what we need
    fs = s3fs.S3FileSystem(
        endpoint_url=s3_fs.settings.get('client_kwargs')['endpoint_url'],
        secret=s3_fs.settings.get('secret'),
        key=s3_fs.settings.get('key'),
    )

    contents = fs.glob(glob)

    # Get a temp file for our tar
    with tempfile.NamedTemporaryFile() as tmp_file:
        # Write a tar to our temp file
        with tarfile.open(tmp_file.name, "w:gz") as tar:
            for content_path in contents:
                with io.BytesIO() as mem_file:
                    # Start building the metadata for tar
                    info = tarfile.TarInfo(name=content_path)

                    # Get bytes of file from S3
                    mem_file.write(fs.cat_file(content_path))
                    mem_file.seek(0)

                    # Get length of the file
                    info.size = len(mem_file.getvalue())
                    mem_file.seek(0)

                    # Add to the archive
                    tar.addfile(info, mem_file)

        content = tmp_file.read()

        for output_path in outpaths:
            await s3_fs.write_path(
                output_path,
                content
            )
