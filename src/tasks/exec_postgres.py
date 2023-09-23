from prefect.blocks.system import Secret
from prefect import task
import psycopg2

connstring = Secret.load("sprocket-main-ds-pg")



@task(name="Execute a Postgres Query")
def exec_pg(query: str):
    conn = psycopg2.connect(connstring.get())
    cursor = conn.cursor()
    cursor.execute(query)
    r = cursor.fetchall()
    return (r, [desc[0] for desc in cursor.description])