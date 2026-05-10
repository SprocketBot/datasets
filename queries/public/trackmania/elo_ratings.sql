SELECT
  er.id AS elo_rating_id,
  er.player_id AS local_player_id,
  p.discord_id,
  p.discord_username,
  p.sprocket_player_id,
  p.member_id,
  er.league,
  er.rating,
  er.wins,
  er.losses,
  er.updated_at
FROM
  trackmania.elo_ratings er
  JOIN trackmania.players p ON p.id = er.player_id
ORDER BY
  er.league,
  er.rating DESC,
  p.discord_username;
