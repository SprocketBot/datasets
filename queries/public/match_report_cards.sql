select
  rca.id report_card_id,
  rca."createdAt" as generated_at,
  rca."sprocketId" as match_id,
  rca."legacyId" as legacy_series_id,
  gsgp.description as league,
  gm.description as game_mode,
  hfp.title as home_team,
  afp.title as away_team,
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
  inner join sprocket.match_parent mp on mp.id = m."matchParentId"
  inner join sprocket.schedule_fixture sf on sf.id = mp."fixtureId"
  inner join sprocket.franchise_profile hfp on hfp."franchiseId" = sf."homeFranchiseId"
  inner join sprocket.franchise_profile afp on afp."franchiseId" = sf."awayFranchiseId"
  left join lateral unnest(rca."userIds") as user_id on true
  left join sprocket.user_profile up on up."userId" = user_id
where
  rca.type = 'MATCH';
