from prefect import flow, task
import psycopg2

from prefect.blocks.system import Secret
connstring = Secret.load("sprocket-main-ds-pg")

@flow(name="Games Played", log_prints=True)
def games_played():
    conn = psycopg2.connect(connstring.get())
    cursor = conn.cursor()
    cursor.query("SELECT COUNT(*) FROM series")
    r = cursor.fetchall()
    print(r)
