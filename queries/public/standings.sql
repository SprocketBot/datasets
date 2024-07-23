WITH
  mle_team_meta AS (
    SELECT
      team.name,
      division_name,
      conference
    FROM
      mledb.team
      INNER JOIN mledb.division ON team.division_name = division.name
    WHERE
      division_name != 'Meta'
  ),
  raw_standings_data AS (
    SELECT
      SUM(
      CASE
           WHEN r."homeWon" THEN 1
           ELSE 0
      END
      )
      as homeWins,
      -- This case statement should mirror the above with THEN x ELSE y reversed to THEN y ELSE x
      SUM(
              CASE
                WHEN r."homeWon" THEN 0
                ELSE 1
              END
        )
      as awayWins,
      sg.description as match,
      home.title as home,
      away.title as away,
      gsgp.description as league,
      gm.description as mode,
      season.description as season
    FROM
      sprocket.match m
      INNER JOIN sprocket.match_parent mp ON m."matchParentId" = mp.id
      INNER JOIN sprocket.schedule_fixture sf ON mp."fixtureId" = sf.id
      INNER JOIN sprocket.schedule_group sg ON sf."scheduleGroupId" = sg.id
      INNER JOIN sprocket.schedule_group season ON sg."parentGroupId" = season.id
      AND season."typeId" IN (
        SELECT
          id
        FROM
          sprocket.schedule_group_type
        WHERE
          code = 'SEASON'
      )
      INNER JOIN sprocket.round r ON m.id = r."matchId"
      INNER JOIN sprocket.franchise_profile home ON home."franchiseId" = sf."homeFranchiseId"
      INNER JOIN sprocket.franchise_profile away ON away."franchiseId" = sf."awayFranchiseId"
      INNER JOIN sprocket.game_skill_group_profile gsgp ON gsgp."skillGroupId" = m."skillGroupId"
      INNER JOIN sprocket.game_skill_group gsg ON gsg.id = m."skillGroupId"
      INNER JOIN sprocket.game_mode gm ON m."gameModeId" = gm.id
      LEFT JOIN sprocket.invalidation round_invalidation ON r."invalidationId" = round_invalidation.id
      LEFT JOIN sprocket.invalidation match_invalidation ON m."invalidationId" = match_invalidation.id
    GROUP BY
      m.id,
      sf.id,
      sg.id,
      home.id,
      away.id,
      gsgp.id,
      gm.id,
      season.id,
      gsg.ordinal,
      round_invalidation.id,
      match_invalidation.id,
      home.title,
      away.title,
      gsgp.description,
      gm.description,
      season.description,
      sg.description
    ORDER BY
      season.id desc,
      sg.id,
      sf.id desc,
      gsg.ordinal
  ),
  unranked AS (
    SELECT
      mtm.name,
      mtm.division_name,
      mtm.conference,
      SUM(
        CASE
          WHEN mtm.name = rsd.home THEN rsd.homeWins
          ELSE rsd.awayWins
        END
      ) as team_wins,
      SUM(
        CASE
          WHEN mtm.name != rsd.home THEN rsd.homeWins
          ELSE rsd.awayWins
        END
      ) as team_losses,
      rsd.league,
      rsd.mode,
      rsd.season
    FROM
      mle_team_meta mtm -- 16818
      INNER JOIN raw_standings_data rsd ON rsd.home = mtm.name
      OR rsd.away = mtm.name
    GROUP BY
      mtm.name,
      rsd.season,
      CUBE (
        rsd.league,
        rsd.mode,
        mtm.division_name,
        mtm.conference
      )
    ORDER BY
      season,
      division_name,
      conference,
      team_wins DESC
  ),
  ranked AS (
    SELECT
      ROW_NUMBER() OVER (
        PARTITION BY
          division_name,
          conference,
          league,
          mode,
          season
        ORDER BY
          CASE
            WHEN team_wins = 0
            AND team_losses = 0 THEN -1
            ELSE team_wins / (team_wins + team_losses)
          END DESC
      ) as ranking,
      *
    FROM
      unranked
  )
SELECT
  *
FROM
  ranked
