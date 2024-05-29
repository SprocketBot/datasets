WITH
    points_per_player AS (
        SELECT
            SUM(ed.scrim_points) as points,
            ed.player_id
        FROM
            mledb.eligibility_data ed
        WHERE
            ed.updated_at > NOW () - INTERVAL '30 days'
        GROUP BY
            2
    ),
    names_teams_with_points AS (
        SELECT
            mle_p.mleid,
            mle_p.name,
            mle_p.team_name,
            ppp.player_id,
            ppp.points
        FROM
            mledb.player mle_p
            INNER JOIN points_per_player ppp ON ppp.player_id = mle_p.id
    )
SELECT
    *
FROM
    names_teams_with_points ntwp
WHERE ntwp.points >= 30
AND ntwp.team_name = 'Pend'




    -- SELECT ed.scrim_points as points, ed.player_id, ed.updated_at FROM mledb.eligibility_data ed
    -- WHERE ed.updated_at > NOW() - INTERVAL '30 days'
    -- AND ed.player_id = 7939