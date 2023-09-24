import os
from prefect import task
from prefect.filesystems import RemoteFileSystem
from pyarrow import parquet
import pyarrow

remote_file_system_block = RemoteFileSystem.load("s3")

@task(log_prints=True)
def to_parquet_file(path: str, data: list[dict]):
    os.makedirs(os.path.join(*path.split("/")[:-1]), exist_ok=True)

    parquet.write_table(pyarrow.Table.from_pylist(data), path)

    return path

if __name__ == '__main__':
    to_parquet_file.fn("./test.parquet", [{"x": 1, "y": 2}, { "x": 2, "y": 3 }])