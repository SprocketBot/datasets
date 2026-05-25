WITH
  player_names AS (
    SELECT
      p.id AS sprocket_player_id,
      MAX(up."displayName") AS player_name
    FROM
      sprocket.player p
      JOIN sprocket."member" mem ON p."memberId" = mem.id
      JOIN sprocket."user" u ON mem."userId" = u.id
      JOIN sprocket.user_profile up ON u.id = up."userId"
    GROUP BY
      p.id
  )
SELECT
  sm.id AS scrim_id,
  sm."createdAt" AS scrim_created_at,
  m.id AS scrim_match_id,
  r.id AS round_id,
  DENSE_RANK() OVER (
    PARTITION BY
      sm.id
    ORDER BY
      r.id
  ) AS game_number,
  psl.id AS player_stat_line_id,
  psl."playerId" AS sprocket_player_id,
  pn.player_name,
  CASE gm.code
    WHEN 'RL_DOUBLES' THEN 'Doubles'
    WHEN 'RL_STANDARD' THEN 'Standard'
    WHEN 'RL_SOLO' THEN 'Solo'
    ELSE gm.code
  END AS game_mode,
  CASE gsgp.description
    WHEN 'Foundation League' THEN 'FL'
    WHEN 'Academy League' THEN 'AL'
    WHEN 'Champion League' THEN 'CL'
    WHEN 'Master League' THEN 'ML'
    WHEN 'Premier League' THEN 'PL'
    ELSE COALESCE(gsgp.description, 'Unassigned')
  END AS league,
  psl."isHome" AS is_blue,
  CASE
    WHEN psl."isHome" THEN 'Blue'
    ELSE 'Orange'
  END AS side,
  r."homeWon" AS blue_won,
  CASE
    WHEN psl."isHome" = r."homeWon" THEN TRUE
    ELSE FALSE
  END AS did_win_game,
  (psl.stats -> 'dpi')::numeric AS dpi,
  (psl.stats -> 'gpi')::numeric AS gpi,
  (psl.stats -> 'opi')::numeric AS opi,
  (
    psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'score'
  )::numeric AS score,
  (
    psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'
  )::numeric AS goals,
  (
    psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'
  )::numeric AS assists,
  (
    psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'
  )::numeric AS saves,
  (
    psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'
  )::numeric AS shots,
  (
    psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'inflicted'
  )::numeric AS demos
FROM
  sprocket.player_stat_line psl
  JOIN sprocket.round r ON psl."roundId" = r.id
  JOIN sprocket.match m ON r."matchId" = m.id
  JOIN sprocket.game_mode gm ON m."gameModeId" = gm.id
  LEFT JOIN sprocket.game_skill_group_profile gsgp ON m."skillGroupId" = gsgp."skillGroupId"
  JOIN sprocket.match_parent mp ON mp.id = m."matchParentId"
  JOIN sprocket.scrim_meta sm ON mp."scrimMetaId" = sm.id
  LEFT JOIN player_names pn ON psl."playerId" = pn.sprocket_player_id
WHERE
  sm."createdAt" >= date_trunc('month', NOW() - INTERVAL '1 year')
ORDER BY
  sm."createdAt" DESC,
  r.id,
  psl."isHome" DESC,
  psl.id
