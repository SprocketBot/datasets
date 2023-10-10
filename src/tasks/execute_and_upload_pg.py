from prefect import task
from prefect.filesystems import RemoteFileSystem

from ..utils.run_pg import run_pg
from ..utils.write_parquet import write_parquet


@task(task_run_name="exec-upload-{bucket_path}")
def execute_and_upload_pg(query: str, bucket_path: str, fs: RemoteFileSystem) -> str:
    """
    Execute and Upload a postgres query as parquet to a remote filesystem

    :param query: SQL query to be executed.
    :param bucket_path: Path of the bucket where the file will be uploaded.
    :param fs: Remote file system used for writing the file.

    :return: The path of the uploaded file in the bucket.
    """
    results = run_pg(f"""
    WITH ORIGINAL AS ({query})
    SELECT current_timestamp as "as_of", ORIGINAL.* FROM ORIGINAL
    """)

    (outpath, close) = write_parquet(results)

    with open(outpath, "rb") as f:
        fs.write_path(
            bucket_path,
            f.read()
        )
    if close:
        close()

    return bucket_path
