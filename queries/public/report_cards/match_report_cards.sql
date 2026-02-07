WITH
  settings AS (
    SELECT
      COALESCE(
        NULLIF(
          current_setting('app.report_cards_base_url', true),
          ''
        ),
        'https://sprocket-image-gen-main-1.nyc3.digitaloceanspaces.com'
      ) AS base_url
  ),
  report_cards AS (
    SELECT
      rca.id AS report_card_id,
      rca."sprocketId" AS match_id,
      rca."legacyId" AS legacy_series_id,
      rca."organizationId" AS organization_id,
      rca."createdAt" AS generated_at,
      rca."minioKey" AS minio_key
    FROM
      sprocket.report_card_asset rca
    WHERE
      rca.type = 'MATCH'
  ),
  series_info AS (
    SELECT
      s.id AS legacy_series_id,
      s.league AS league,
      s.mode AS game_mode,
      f.home_name AS home_team,
      f.away_name AS away_team
    FROM
      mledb.series s
      LEFT JOIN mledb.fixture f ON f.id = s.fixture_id
  )
SELECT DISTINCT
  rc.report_card_id,
  rc.match_id,
  rc.legacy_series_id,
  rc.organization_id,
  rc.generated_at,
  si.league,
  si.game_mode,
  si.home_team,
  si.away_team,
  p.name AS player_name,
  CONCAT(settings.base_url, '/', rc.minio_key) AS report_card_url
FROM
  report_cards rc
  JOIN settings ON true
  LEFT JOIN series_info si ON si.legacy_series_id = rc.legacy_series_id
  LEFT JOIN mledb.series_replay sr ON sr.series_id = rc.legacy_series_id
  LEFT JOIN mledb.player_stats_core psc ON psc.replay_id = sr.id
  LEFT JOIN mledb.player p ON p.id = psc.player_id;
