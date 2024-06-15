SELECT
  sf.id as fixture_id,
  sf."scheduleGroupId" as match_group_id,
  home.title as home,
  away.title as away
FROM
  sprocket.schedule_fixture sf
  INNER JOIN sprocket.franchise_profile home on sf."homeFranchiseId" = home."franchiseId"
  INNER JOIN sprocket.franchise_profile away ON sf."awayFranchiseId" = away."franchiseId"
  INNER JOIN sprocket.schedule_group sg ON sf."scheduleGroupId" = sg.id
ORDER BY
  sg.start,
  sg.end,
  fixture_id
