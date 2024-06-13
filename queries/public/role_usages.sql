SELECT
  COUNT(distinct s.id) FILTER (
    WHERE
      mode = 'DOUBLES'
  ) as doubles_uses,
  COUNT(distinct s.id) FILTER (
    WHERE
      mode = 'STANDARD'
  ) as standard_uses,
  COUNT(distinct s.id) as total_uses,
  season_number,
  team_name,
  tru.league,
  tru.role
FROM
  mledb.series s
  INNER JOIN mledb.fixture f on f.id = s.fixture_id
  INNER JOIN mledb.match m on f.match_id = m.id
  INNER JOIN mledb.season se on m.season = se.season_number
  INNER JOIN mledb.team_role_usage tru ON tru.series_id = s.id
GROUP BY
  se.season_number,
  tru.team_name,
  tru.league,
  tru.role
ORDER BY
  se.season_number desc,
  team_name,
  league
