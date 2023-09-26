from prefect.blocks.system import Secret
import psycopg
from psycopg.rows import dict_row


def run_pg(query: str):
    connstring = Secret.load("sprocket-main-ds-pg")
    conn = psycopg.connect(connstring.get(), row_factory=dict_row)
    cursor = conn.cursor()
    cursor.execute(query)
    r = cursor.fetchall()
    return r
