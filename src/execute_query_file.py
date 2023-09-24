import os

from prefect import flow
from tasks.exec_postgres import exec_pg
from tasks.flush_as_parquet import flush_parquet
from tasks.to_parquet_file import to_parquet_file

@flow(log_prints=True, name="Execute Query File")
def execute_query_file(query_file: str, bucket_prefix: str, to_s3=True):
    if not query_file:
        raise Exception("Missing required parameter 'query_file'")

    with open(query_file, "r") as f:
        query = f.read()

    result = exec_pg(query)
    bucket_path = f"{bucket_prefix}/{query_file.split('/')[-1].replace('sql', 'parquet')}"
    if to_s3:
        flush_parquet(bucket_path, result)
    else:
        to_parquet_file(bucket_path, result)

if __name__ == "__main__":
    # Gets the public queries
    dir_path = os.path.dirname(os.path.realpath(__file__))
    queries_dir = os.path.join(dir_path, "..", "queries", "public")
    queries = os.listdir(queries_dir)

    execute_query_file(os.path.join(queries_dir, queries[0]), "public")