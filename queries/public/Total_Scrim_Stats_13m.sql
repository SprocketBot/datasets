WITH
  scrim_points_earned AS (
    --doing this to account for suspected per-round of scrim duplication happening in sprocket.eligibility_data table
    --since it was outputting rows per each game played in 3 game scrims, users were recieving 3x the points they should
    SELECT DISTINCT
      ed."createdAt",
      ed.points,
      ed."matchParentId",
      ed."playerId"
    FROM
      sprocket.eligibility_data ed
    WHERE
      ed."createdAt" >= '2025-09-10'
    ORDER BY
      ed."createdAt"
  )
SELECT
  p.id AS sprocket_player_id,
  MAX(up."displayName") AS name,
  CASE gm.code
    WHEN 'RL_DOUBLES' THEN '2s'
    WHEN 'RL_STANDARD' THEN '3s'
    ELSE gm.code
  END AS gamemode,
  CASE gsgp.description
    WHEN 'Foundation League' THEN 'FL'
    WHEN 'Academy League' THEN 'AL'
    WHEN 'Champion League' THEN 'CL'
    WHEN 'Master League' THEN 'ML'
    WHEN 'Premier League' THEN 'PL'
    ELSE gsgp.description
  END AS skill_group,
  sm."createdAt" AS scrim_created_at,
  sm.id AS scrim_meta_id,
  spe.points AS scrim_points_earned,
  COUNT(psl.id) AS rounds_count,
  SUM(
    CASE
      WHEN psl."isHome" = true
      AND r."homeWon" = true THEN 1
      WHEN psl."isHome" = false
      AND r."homeWon" = false THEN 1
      ELSE 0
    END
  ) AS round_wins,
  (
    SUM(
      CASE
        WHEN psl."isHome" = true
        AND r."homeWon" = true THEN 1
        WHEN psl."isHome" = false
        AND r."homeWon" = false THEN 1
        ELSE 0
      END
    )::float / NULLIF(COUNT(psl.id), 0)
  ) AS win_percentage,
  CASE
    WHEN SUM(
      CASE
        WHEN psl."isHome" = true
        AND r."homeWon" = true THEN 1
        WHEN psl."isHome" = false
        AND r."homeWon" = false THEN 1
        ELSE 0
      END
    ) > (COUNT(psl.id) / 2.0) THEN TRUE
    ELSE FALSE
  END AS did_win_scrim,
  AVG((psl.stats -> 'dpi')::numeric) AS dpi,
  AVG((psl.stats -> 'gpi')::numeric) AS avg_sprocket_rating,
  AVG((psl.stats -> 'opi')::numeric) AS opi,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'score'
      )::numeric
    )
  ) AS score,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'
      )::numeric
    )
  ) AS goals,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'
      )::numeric
    )
  ) AS assists,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'
      )::numeric
    )
  ) AS saves,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'
      )::numeric
    )
  ) AS shots,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against'
      )::numeric
    )
  ) AS goals_against,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against'
      )::numeric
    )
  ) AS shots_against,
  SUM(
    (
      (
        psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'inflicted'
      )::numeric
    )
  ) AS demos
FROM
  sprocket.player_stat_line psl
  JOIN sprocket.player p ON psl."playerId" = p.id
  JOIN sprocket.round r ON psl."roundId" = r.id
  JOIN sprocket.match m ON r."matchId" = m.id
  JOIN sprocket.game_mode gm ON m."gameModeId" = gm.id
  JOIN sprocket.game_skill_group_profile gsgp ON m."skillGroupId" = gsgp."skillGroupId"
  JOIN sprocket.match_parent mp ON mp.id = m."matchParentId"
  JOIN sprocket.scrim_meta sm ON mp."scrimMetaId" = sm.id
  JOIN sprocket."member" mem ON p."memberId" = mem.id
  JOIN sprocket."user" u ON mem."userId" = u.id
  JOIN sprocket.user_profile up ON u.id = up."userId"
  JOIN scrim_points_earned spe ON mp.id = spe."matchParentId"
  AND p.id = spe."playerId"
WHERE
  sm."createdAt" >= date_trunc('month', NOW() - INTERVAL '1 year')
GROUP BY
    p.id,
    gm.code,
    gsgp.description,
    sm."createdAt",
    sm.id,
    spe.points
