SELECT
  eh.id AS elo_history_id,
  eh.player_id AS local_player_id,
  p.discord_id,
  p.discord_username,
  p.sprocket_player_id,
  p.member_id,
  eh.scrim_id AS local_scrim_id,
  s.scrim_uid,
  s.sprocket_match_parent_id,
  s.sprocket_match_id,
  mp."fixtureId" AS fixture_id,
  s.league,
  eh.old_rating,
  eh.new_rating,
  eh.change_amount,
  eh.created_at
FROM
  trackmania.elo_history eh
  JOIN trackmania.players p ON p.id = eh.player_id
  JOIN trackmania.scrims s ON s.id = eh.scrim_id
  LEFT JOIN sprocket.match_parent mp ON mp.id = s.sprocket_match_parent_id
ORDER BY
  eh.created_at DESC,
  eh.scrim_id,
  p.discord_username;
