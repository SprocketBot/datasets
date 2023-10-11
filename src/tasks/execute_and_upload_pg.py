from prefect import task
from prefect.filesystems import RemoteFileSystem

from utils.run_pg import run_pg
from utils.write_json import write_json
from utils.write_parquet import write_parquet
from utils.write_csv import write_csv


@task(task_run_name="Exec, Upload {destination_path}")
def execute_and_upload_pg(query: str,
                          destination_path: str,
                          fs: RemoteFileSystem,
                          formats=("parquet", "csv", "json")) -> str:
    """
    Execute and Upload a postgres query as parquet to a remote filesystem

    :param query: SQL query to be executed.
    :param destination_path: Path of the bucket where the file will be uploaded.
    :param fs: Remote file system used for writing the file.
    :param formats: Formats to produce; parquet, csv, and json are supported

    :return: The path of the uploaded file in the bucket.
    """
    results = run_pg(f"""
    WITH ORIGINAL AS ({query})
    SELECT current_timestamp as "as_of", ORIGINAL.* FROM ORIGINAL
    """)


    if "parquet" in formats:
        (parquet_path, close) = write_parquet(results)

        with open(parquet_path, "rb") as f:
            fs.write_path(
                destination_path + ".parquet",
                f.read()
            )
        if close:
            close()

    if "csv" in formats:
        (csv_path, close) = write_csv(results)
        with open(csv_path, "rb") as f:
            fs.write_path(
                destination_path + ".csv",
                f.read()
            )
        if close:
            close()

    if "json" in formats:
        (json_path, close) = write_json(results)
        with open(json_path, "rb") as f:
            fs.write_path(
                destination_path + ".json",
                f.read()
            )
        if close:
            close()

    return destination_path
