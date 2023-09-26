from prefect.blocks.system import Secret
from prefect import task
import psycopg
from psycopg.rows import dict_row

connstring = Secret.load("sprocket-main-ds-pg")


@task(name="Execute a Postgres Query", task_run_name="exec-{query_name}")
def exec_pg(query: str, query_name: str) -> list[dict]:
    conn = psycopg.connect(connstring.get(), row_factory=dict_row)
    cursor = conn.cursor()
    cursor.execute(query)
    r = cursor.fetchall()
    return r