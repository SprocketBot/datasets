from prefect.blocks.system import Secret
from prefect import task
import psycopg
from psycopg.rows import dict_row


connstring = Secret.load("sprocket-main-ds-pg")



@task(name="Execute a Postgres Query")
def exec_pg(query: str) -> list[dict]:
    conn = psycopg.connect(connstring.get(), row_factory=dict_row)
    cursor = conn.cursor()
    cursor.execute(query)
    r = cursor.fetchall()
    return r