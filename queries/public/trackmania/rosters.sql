SELECT
  rs.id AS roster_slot_id,
  t.id AS team_id,
  fp.title AS team_name,
  f.id AS franchise_id,
  fp.code AS franchise_code,
  gsg.id AS skill_group_id,
  COALESCE(gsgp.description, gsgp.code) AS league,
  rr.id AS roster_role_id,
  rr.code AS roster_role_name,
  rs."playerId" AS sprocket_player_id,
  lp.id AS local_player_id,
  lp.discord_id,
  lp.discord_username,
  lp.member_id,
  lp.platform_account_ids
FROM
  sprocket.roster_slot rs
  JOIN sprocket.team t ON t.id = rs."teamId"
  JOIN sprocket.franchise f ON f.id = t."franchiseId"
  join sprocket.franchise_profile fp on fp."franchiseId" = f.id
  JOIN sprocket.game_skill_group gsg ON gsg.id = t."skillGroupId"
  JOIN sprocket.game g ON g.id = gsg."gameId"
  LEFT JOIN sprocket.game_skill_group_profile gsgp ON gsgp."skillGroupId" = gsg.id
  JOIN sprocket.roster_role rr ON rr.id = rs."roleId"
  LEFT JOIN trackmania.players lp ON lp.sprocket_player_id = rs."playerId"
WHERE
  g.id = 8 -- Trackmania is game id 8, RL is 7
ORDER BY
  league,
  team_name,
  roster_role_name,
  roster_slot_id;
