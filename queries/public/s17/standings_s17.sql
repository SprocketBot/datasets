WITH series_record (a, b, c, d, e, f, g, h) AS (SELECT stand.conference,                                                     -- a
                                                       stand.tn,                                                             -- b
                                                       stand.dn,                                                             -- c

                                                       SUM(CASE WHEN Swin >= 3 THEN 1 ELSE 0 END)        AS Win,             -- d
                                                       SUM(CASE WHEN Swin < 3 THEN 1 ELSE 0 END)         AS Loss,            -- e
                                                       CONCAT(SUM(CASE WHEN Swin >= 3 THEN 1 ELSE 0 END), '-',
                                                              SUM(CASE WHEN Swin < 3 THEN 1 ELSE 0 END)) AS "Series Record", -- f
                                                       stand.league,
                                                       stand.mode

                                                FROM (SELECT division.conference                                                         AS conference,
                                                             team.name                                                                   AS tn,
                                                             team.division_name                                                          AS dn,
                                                             SUM(CASE WHEN team.name = sr.winning_team_name THEN 1 ELSE 0 END)           AS win,
                                                             SUM(CASE WHEN team.name <> sr.winning_team_name THEN 1 ELSE 0 END)          AS lose,
                                                             SUM(CASE
                                                                     WHEN fixture.match_id = match.id AND team.name = sr.winning_team_name
                                                                         THEN 1
                                                                     ELSE 0 END)                                                         AS Swin,

                                                             CONCAT(
                                                                     SUM(CASE WHEN team.name = sr.winning_team_name THEN 1 ELSE 0 END),
                                                                     '-',
                                                                     SUM(CASE WHEN team.name <> sr.winning_team_name THEN 1 ELSE 0 END)) AS "Record",
                                                             CONCAT(ROUND(
                                                                            (SUM(CASE WHEN team.name = sr.winning_team_name THEN 1.0 ELSE 0 END) /
                                                                             COALESCE(COUNT(1), 0) * 100) :: DECIMAL,
                                                                            2),
                                                                    '%')                                                                 AS WinPercentage,
                                                             SUM(tcs.goals)
                                                             FILTER (WHERE sr.ncp = false and series.full_ncp = false) -
                                                             SUM(tcs.goals_against)
                                                             FILTER (WHERE sr.ncp = false and series.full_ncp = false)                   AS "Goal Differential",
                                                             series.league                                                               AS league,
                                                             series.mode                                                                 AS mode

                                                      FROM mledb.series series

                                                               JOIN mledb.series_replay AS sr
                                                                    on sr.series_id = series.id

                                                               join mledb.fixture fixture
                                                                    on series.fixture_id = fixture.id

                                                               join mledb.match match
                                                                    on fixture.match_id = match.id

                                                               join mledb.team team
                                                                    on team.name = fixture.home_name or team.name = fixture.away_name

                                                               join mledb.division division
                                                                    on team.division_name = division.name

                                                               left join mledb.team_core_stats AS tcs
                                                                         on team.name = tcs.team_name and sr.id = tcs.replay_id

                                                      WHERE match.season = 17
                                                        --AND series.updated_by <> 'Playoffs'
                                                        AND match.match_number < 20
                                                        AND match.match_number > 0
                                                      --AND series.mode = 'STANDARD' -- Filter for gamemode
                                                      --AND series.league = 'MASTER' -- Filter for league
                                                      GROUP BY division.conference, team.name, team.division_name,
                                                               match.id, series.mode, series.league
                                                      ORDER BY WinPercentage DESC) AS stand

                                                GROUP BY stand.conference, stand.tn, stand.dn, stand.league,
                                                         stand.mode),

     standing AS
         (SELECT division.conference                                                              AS conference,
                 team.name                                                                        AS team,
                 team.division_name                                                               AS div,
                 CONCAT(SUM(CASE WHEN team.name = sr.winning_team_name THEN 1 ELSE 0 END), '-',
                        SUM(CASE WHEN team.name <> sr.winning_team_name THEN 1 ELSE 0 END))       AS record,
                 CONCAT(ROUND((SUM(CASE WHEN team.name = sr.winning_team_name THEN 1.0 ELSE 0 END) /
                               COALESCE(COUNT(1), 0) * 100) :: DECIMAL, 2), '%')                  AS WinPercentage,
                 SUM(tcs.goals) FILTER (WHERE sr.ncp = false and series.full_ncp = false) -
                 SUM(tcs.goals_against) FILTER (WHERE sr.ncp = false and series.full_ncp = false) AS gd,
                 series.mode                                                                      AS mode,
                 series.league                                                                    AS league


          FROM mledb.series series

                   JOIN mledb.series_replay AS sr
                        on sr.series_id = series.id

                   join mledb.fixture fixture
                        on series.fixture_id = fixture.id

                   join mledb.match match
                        on fixture.match_id = match.id

                   join mledb.team team
                        on team.name = fixture.home_name or team.name = fixture.away_name

                   join mledb.division division
                        on team.division_name = division.name

                   left join mledb.team_core_stats AS tcs
                             on team.name = tcs.team_name and sr.id = tcs.replay_id

          WHERE match.season = 17
            AND match.match_number < 20
            AND match.match_number > 0
          GROUP BY division.conference, team.name, team.division_name, series.mode, series.league
          ORDER BY WinPercentage DESC)

SELECT RANK()
       OVER (PARTITION BY standing.mode, standing.league ORDER BY standing.WinPercentage DESC, series_record.d DESC, standing.gd DESC) AS "Rank",
       conference                                                                                                                      AS "Conference",
       team                                                                                                                            AS "Team",
       div                                                                                                                             AS "Division",
       standing.league                                                                                                                 AS "League",
       standing.mode                                                                                                                   AS "Mode",
       standing.record                                                                                                                 AS "Record",
       standing.WinPercentage                                                                                                          AS "Win Percentage",
       standing.gd                                                                                                                     AS "Goal Differential",
       series_record.f                                                                                                                 AS "Series Record"


FROM standing,
     series_record
WHERE standing.conference = series_record.a
  AND standing.div = series_record.c
  AND standing.team = series_record.b
  AND standing.league = series_record.g
  AND standing.mode = series_record.h
GROUP BY standing.conference, standing.team, standing.div, standing.record, standing.WinPercentage, standing.gd,
         series_record.f, series_record.d, standing.gd, standing.league, standing.mode
ORDER BY standing.WinPercentage DESC, series_record.d DESC, standing.gd DESC