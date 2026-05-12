SELECT
  ed.id AS eligibility_id,
  ed."matchParentId" AS match_parent_id,
  ed."playerId" AS sprocket_player_id,
  lp.id AS local_player_id,
  lp.discord_id,
  lp.discord_username,
  lp.member_id,
  s.id AS local_scrim_id,
  s.scrim_uid,
  s.sprocket_match_id,
  mp."fixtureId" AS fixture_id,
  ed.points
FROM
  sprocket.eligibility_data ed
  JOIN sprocket.player sp ON sp.id = ed."playerId"
  JOIN sprocket.game_skill_group gsg ON gsg.id = sp."skillGroupId"
  JOIN sprocket.game g ON g.id = gsg."gameId"
  LEFT JOIN trackmania.players lp ON lp.sprocket_player_id = sp.id
  LEFT JOIN trackmania.scrims s ON s.sprocket_match_parent_id = ed."matchParentId"
  LEFT JOIN sprocket.match_parent mp ON mp.id = ed."matchParentId"
WHERE
  g.title = 'Trackmania'
ORDER BY
  ed."matchParentId" DESC,
  lp.discord_username;
