SELECT
  DATE_TRUNC('week', r."createdAt") as weekOf,
  COUNT(distinct r.id) as played_rounds,
  COUNT(distinct m.id) as played_matches,
  COUNT(distinct psl."playerId") as unique_players,
  COUNT(DISTINCT r.id) FILTER (
    WHERE
      gm.code = 'RL_DOUBLES'
  ) as "2s_rounds",
  COUNT(DISTINCT r.id) FILTER (
    WHERE
      gm.code = 'RL_STANDARD'
  ) as "3s_rounds",
  COUNT(DISTINCT m.id) FILTER (
    WHERE
      gm.code = 'RL_DOUBLES'
  ) as "2s_matches",
  COUNT(DISTINCT m.id) FILTER (
    WHERE
      gm.code = 'RL_STANDARD'
  ) as "3s_matches"
FROM
  sprocket.scrim_meta scrim
  INNER JOIN sprocket.match_parent mp ON mp."scrimMetaId" = scrim.id
  INNER JOIN sprocket.match m ON m."matchParentId" = mp.id
  INNER JOIN sprocket.game_mode gm ON m."gameModeId" = gm.id
  INNER JOIN sprocket.round r ON r."matchId" = m.id
  INNER JOIN sprocket.player_stat_line psl ON psl."roundId" = r.id
GROUP BY
  1
