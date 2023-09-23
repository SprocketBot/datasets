from prefect import flow, task

from prefect.blocks.system import Secret

from tasks.write_to_google_sheet import write_to_google_sheet
from tasks.exec_postgres import exec_pg
from prefect.blocks.notifications import DiscordWebhook


gcs_service_acct_creds = Secret.load("gcs-service-acct")
discord_webhook_block = DiscordWebhook.load("frog-of-knowledge-alerts")


# Prep Blocks
@flow(name="Average Player Stats", log_prints=True)
def avg_player_stats():
    (query_result, query_columns) = exec_pg("""
WITH RAW_STATS AS (
    SELECT stats,
        (psl.stats->'gpi')::numeric as SprocketRating,
        (psl.stats->'otherStats'->'stats'->'core'->'mvp')::boolean as mvp,
        (psl.stats->'otherStats'->'stats'->'core'->'goals')::numeric as goals,
        (psl.stats->'otherStats'->'stats'->'core'->'saves')::numeric as saves,
        (psl.stats->'otherStats'->'stats'->'core'->'score')::numeric as score,
        (psl.stats->'otherStats'->'stats'->'core'->'shots')::numeric as shots,
        (psl.stats->'otherStats'->'stats'->'core'->'assists')::numeric as assists,
        (psl.stats->'otherStats'->'stats'->'core'->'shooting_percentage')::numeric as shooting_percentage,
        mp.name
        FROM sprocket.player_stat_line psl
        INNER JOIN sprocket.player p ON p.id = psl."playerId"
        INNER JOIN sprocket.member_profile mp ON p."memberId" = mp."memberId"
)
SELECT 
    name as "Player Name",
    COUNT(*) AS "Games Included",
    ROUND(AVG(SprocketRating),2) as "Average Sprocket Rating",
    CONCAT(ROUND(100 * AVG(CASE WHEN MVP THEN 1 ELSE 0 END), 2), '%') as "MVP %",
    COUNT(*) FILTER (WHERE MVP) as "Games MVP'd",
    ROUND(AVG(goals), 2) as "Average goals",
    ROUND(SUM(goals), 2) as "Total goals",
    ROUND(AVG(saves), 2) as "Average saves",
    ROUND(SUM(saves), 2) as "Total saves",
    ROUND(AVG(score), 2) as "Average score",
    ROUND(SUM(score), 2) as "Total score",
    ROUND(AVG(shots), 2) as "Average shots",
    ROUND(SUM(shots), 2) as "Total shots",
    ROUND(AVG(assists), 2) as "Average assists",
    ROUND(SUM(assists), 2) as "Total assists",
    CONCAT(ROUND(AVG(shooting_percentage), 2), '%') as "Shooting %"
 FROM RAW_STATS
 GROUP BY name
""")

    (sheet_url, sheet_title, inserted_rows) = write_to_google_sheet('Basic Data Export', query_result, query_columns, gcs_service_acct_creds.get())

    discord_webhook_block.notify(f"Wrote {inserted_rows} rows to [{sheet_title}]({sheet_url})")

if __name__ == "__main__":
    avg_player_stats()
