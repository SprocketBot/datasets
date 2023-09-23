from prefect import flow, task
import psycopg2

from prefect.blocks.system import Secret
connstring = Secret.load("sprocket-main-ds-pg")

@flow(name="Games Played", log_prints=True)
def games_played():
    conn = psycopg2.connect(connstring.get())
    cursor = conn.cursor()
    cursor.execute("""
SELECT COUNT(*), DATE_TRUNC('week', "createdAt") FROM sprocket.match GROUP BY 2 ORDER BY 2 desc LIMIT 1;
""")
    r = cursor.fetchall()
    print(r)
