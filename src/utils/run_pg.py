from prefect.blocks.system import Secret
import psycopg
from psycopg.rows import dict_row


def run_pg(query: str):
    connstring = Secret.load("sprocket-main-ds-pg")
    info = psycopg.conninfo.make_conninfo(connstring.get())
    conn = psycopg.connect(conninfo=info, row_factory=dict_row)
    cursor = conn.cursor()
    cursor.execute(query)
    r = cursor.fetchall()
    return r
