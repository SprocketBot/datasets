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
      rca."sprocketId" AS scrim_id,
      rca."legacyId" AS legacy_scrim_id,
      rca."scrimUuid" AS scrim_uuid,
      rca."organizationId" AS organization_id,
      rca."createdAt" AS generated_at,
      rca."minioKey" AS minio_key,
      UNNEST(rca."userIds") AS user_id
    FROM
      sprocket.report_card_asset rca
    WHERE
      rca.type = 'SCRIM'
  ),
  member_names AS (
    SELECT
      m."userId" AS user_id,
      m."organizationId" AS organization_id,
      mp.name AS player_name
    FROM
      sprocket.member m
      LEFT JOIN sprocket.member_profile mp ON mp."memberId" = m.id
  )
SELECT
  rc.report_card_id,
  rc.scrim_id,
  rc.legacy_scrim_id,
  rc.scrim_uuid,
  rc.organization_id,
  rc.generated_at,
  rc.user_id,
  COALESCE(mn.player_name, 'Unknown') AS player_name,
  sc.type AS scrim_type,
  sc.mode AS scrim_mode,
  se.league AS league,
  CONCAT(settings.base_url, '/', rc.minio_key) AS report_card_url
FROM
  report_cards rc
  JOIN settings ON true
  LEFT JOIN member_names mn ON mn.user_id = rc.user_id
  AND mn.organization_id = rc.organization_id
  LEFT JOIN mledb.scrim sc ON sc.id = rc.legacy_scrim_id
  LEFT JOIN mledb.series se ON se.scrim_id = rc.legacy_scrim_id;
