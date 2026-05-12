SELECT
  mps.id AS stat_id,
  mps.scrim_id AS local_scrim_id,
  s.scrim_uid,
  s.sprocket_match_parent_id,
  s.sprocket_match_id,
  mp."fixtureId" AS fixture_id,
  mps.map_id AS local_map_id,
  maps.uid AS map_uid,
  maps.name AS map_name,
  mps.player_id AS local_player_id,
  p.discord_id,
  p.discord_username,
  p.sprocket_player_id,
  p.member_id,
  p.platform_account_ids,
  mps.team_id,
  mps.points,
  mps.is_finished,
  mps.is_dnf,
  mps.round_points,
  mps.nb_respawns,
  mps.respawn_times,
  mps.best_time,
  mps.cp_times,
  mps.respawn_time_loss,
  mps.nb_respawns_by_cp,
  mps.created_at
FROM
  trackmania.match_player_stats mps
  JOIN trackmania.scrims s ON s.id = mps.scrim_id
  JOIN trackmania.players p ON p.id = mps.player_id
  LEFT JOIN trackmania.maps maps ON maps.id = mps.map_id
  LEFT JOIN sprocket.match_parent mp ON mp.id = s.sprocket_match_parent_id
ORDER BY
  mps.created_at DESC,
  mps.scrim_id,
  mps.map_id,
  mps.team_id,
  mps.points DESC;
