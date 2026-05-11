SELECT
  s.id AS local_scrim_id,
  s.scrim_uid,
  s.league,
  s.status,
  s.match_type,
  s.winner_team,
  s.elo_processed,
  s.sprocket_match_parent_id,
  s.sprocket_match_id,
  mp."fixtureId" AS fixture_id,
  sf."homeFranchiseId" AS home_franchise_id,
  home.name AS home_franchise_name,
  sf."awayFranchiseId" AS away_franchise_id,
  away.name AS away_franchise_name,
  sg.id AS schedule_group_id,
  sg.name AS schedule_group_name,
  gsg.id AS skill_group_id,
  COALESCE(gsgp.description, gsgp.code) AS skill_group,
  gm.name AS game_mode,
  s.created_at,
  s.completed_at
FROM
  trackmania.scrims s
  LEFT JOIN sprocket.match_parent mp ON mp.id = s.sprocket_match_parent_id
  LEFT JOIN sprocket.schedule_fixture sf ON sf.id = mp."fixtureId"
  LEFT JOIN sprocket.franchise home ON home.id = sf."homeFranchiseId"
  LEFT JOIN sprocket.franchise away ON away.id = sf."awayFranchiseId"
  LEFT JOIN sprocket.schedule_group sg ON sg.id = sf."scheduleGroupId"
  LEFT JOIN sprocket.game_skill_group gsg ON gsg.id = sf."skillGroupId"
  LEFT JOIN sprocket.game g ON g.id = gsg."gameId"
  LEFT JOIN sprocket.game_skill_group_profile gsgp ON gsgp."skillGroupId" = gsg.id
  LEFT JOIN sprocket.game_mode gm ON gm.id = sf."gameModeId"
WHERE
  g.title = 'Trackmania'
  OR s.sprocket_match_parent_id IS NOT NULL
ORDER BY
  s.created_at DESC;
