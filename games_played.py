from prefect import flow, task
import psycopg2

from prefect.blocks.system import Secret
from prefect.blocks.notifications import DiscordWebhook

# Prep Blocks
connstring = Secret.load("sprocket-main-ds-pg")
discord_webhook_block = DiscordWebhook.load("frog-of-knowledge-alerts")



@flow(name="Games Played", log_prints=True)
def games_played():
    conn = psycopg2.connect(connstring.get())
    cursor = conn.cursor()
    cursor.execute("""
SELECT  COUNT(*) as games, 
        DATE_TRUNC('hour', "createdAt")
FROM sprocket.match 
GROUP BY 2
ORDER BY 2 desc
LIMIT 1;
""")
    r = cursor.fetchall()
    notify_str = f"""
There have been {r[0][0]} matches played in the last hour!
"""
    print(notify_str)
    discord_webhook_block.notify(notify_str)

if __name__ == "__main__":
    games_played()
