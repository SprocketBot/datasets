import os
from prefect import task
from prefect.filesystems import RemoteFileSystem
from pyarrow import parquet
import pyarrow

remote_file_system_block = RemoteFileSystem.load("s3")

@task(log_prints=True)
def flush_parquet(path: str, data: list[dict]):
    
    print("Creating temporary parquet file...")
    parquet.write_table(pyarrow.Table.from_pylist(data), 'tmp.parquet')
    print("Created temp file, uploading to remote file system")
    with open('tmp.parquet', 'rb') as f:
        remote_file_system_block.write_path(path, f.read())
    print("Uploaded; removing local file")
    os.remove('tmp.parquet')


if __name__ == '__main__':
    flush_parquet.fn("./test", [{"x": 1, "y": 2}, { "x": 2, "y": 3 }])