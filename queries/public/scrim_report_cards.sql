select
  rca.id report_card_id,
  rca."createdAt" as generated_at,
  rca."sprocketId" as match_id,
  rca."legacyId" as legacy_series_id,
  gsgp.description as league,
  gm.description as game_mode,
  'BLUE' as home_team,
  'ORANGE' as away_team,
  up."displayName" as player_name,
  rca."scrimUuid",
  rca."userIds",
  rca."franchiseIds",
  CONCAT(
    'https://report-cards.mlesports.gg/',
    rca."minioKey"
  ) as report_card_url
from
  sprocket.report_card_asset rca
  inner join sprocket.match m on m.id = rca."sprocketId"
  inner join sprocket.game_mode gm on gm.id = m."gameModeId"
  inner join sprocket.game_skill_group_profile gsgp on gsgp."skillGroupId" = m."skillGroupId"
  left join lateral unnest(rca."userIds") as player_id on true
  left join sprocket.user_profile up on up."userId" = player_id
where
  rca.type = 'SCRIM';
