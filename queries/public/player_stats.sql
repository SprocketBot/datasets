SELECT ROUND((stats -> 'dpi'                                               )::numeric, 2) as dpi,
       ROUND((stats -> 'gpi'                                               )::numeric, 2) as gpi,
       ROUND((stats -> 'opi'                                               )::numeric, 2) as opi,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'        )::numeric, 2) as goals,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'        )::numeric, 2) as saves,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'score'        )::numeric, 2) as score,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'        )::numeric, 2) as shots,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'      )::numeric, 2) as assists,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against')::numeric, 2) as goals_against,
       ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against')::numeric, 2) as shots_against,
       p."memberId"                                                  as player_id
FROM sprocket.player_stat_line
         INNER JOIN player p on player_stat_line."playerId" = p.id