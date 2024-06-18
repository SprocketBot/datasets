SELECT
  ROUND((stats -> 'dpi')::numeric, 2) as dpi,
  ROUND((stats -> 'gpi')::numeric, 2) as gpi,
  ROUND((stats -> 'opi')::numeric, 2) as opi,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'
    )::numeric,
    2
  ) as goals,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'
    )::numeric,
    2
  ) as saves,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'score'
    )::numeric,
    2
  ) as score,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'
    )::numeric,
    2
  ) as shots,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'
    )::numeric,
    2
  ) as assists,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against'
    )::numeric,
    2
  ) as goals_against,
  ROUND(
    (
      stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against'
    )::numeric,
    2
  ) as shots_against,
  p."memberId" as member_id,
  r.id as round_id,
  r."matchId" as match_id,
  gm.code as gamemode,
  gsgp.description as skill_group,
  tsl."teamName" as team_name
FROM
  sprocket.player_stat_line psl
  INNER JOIN player p on psl."playerId" = p.id
  INNER JOIN round r on psl."roundId" = r.id
  INNER JOIN match m on r."matchId" = m.id
  INNER JOIN match_parent mp ON mp.id = m."matchParentId"
  INNER JOIN schedule_fixture sf ON mp."fixtureId" = sf.id
  INNER JOIN schedule_group sg ON sf."scheduleGroupId" = sg.id
  INNER JOIN game_mode gm ON m."gameModeId" = gm.id
  INNER JOIN game_skill_group_profile gsgp ON m."skillGroupId" = gsgp."skillGroupId"
  INNER JOIN sprocket.team_stat_line tsl ON psl."teamStatsId" = tsl.id
WHERE
  sg."parentGroupId" = 219
