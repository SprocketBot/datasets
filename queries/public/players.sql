WITH
  scrim_points AS (
    SELECT
      SUM(ed.scrim_points) as points,
      ed.player_id
    FROM
      mledb.eligibility_data ed
    WHERE
      ed.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' >= DATE (NOW() AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'
    GROUP BY
      2
  ),
  eligibility_date as (
    SELECT
      DATE (ed.created_at_est) + INTERVAL '30 DAYS' as "Eligible Through",
      sum_points as "Total Points",
      ed.player_id
    FROM
      (
        -- can uncomment below once we rememdy the numorous issues in the sprocket.eligibility_data table
        --         SELECT
        --            ed."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS created_at_est,
        --            ed.points,
        --            ed."matchParentId",
        --            ed."playerId",
        --            SUM(ed.points) OVER (PARTITION BY ed."playerId" ORDER BY ed."createdAt" DESC) AS sum_points
        --        FROM sprocket.eligibility_data ed
        --        WHERE ed."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' >= DATE(NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'
        --        GROUP BY
        --            1, 2, 3, 4, ed."createdAt"
        --        ORDER BY ed."createdAt" DESC
        -- temporary fix using mledb.eligibility_data table, remove once above is uncommented
        SELECT
          ed.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS created_at_est,
          ed.scrim_points,
          ed.scrim_id,
          ed.player_id,
          SUM(ed.scrim_points) OVER (
            PARTITION BY
              ed.player_id
            ORDER BY
              ed.created_at DESC
          ) AS sum_points
        FROM
          mledb.eligibility_data ed
        WHERE
          ed.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' >= DATE (NOW() AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'
        GROUP BY
          1,
          2,
          3,
          4,
          ed.created_at --needed for the partition's order by statement
        ORDER BY
          ed.created_at DESC
      ) ed
      LEFT JOIN mledb.player p ON ed.player_id = p.id
      LEFT JOIN mledb.salary_cap sc ON p.league = sc.league
    WHERE
      sum_points = sc.eligibility_requirement
    ORDER BY
      ed.player_id,
      ed.created_at_est DESC
  )
SELECT
  mp.name,
  p.salary,
  p.id as sprocket_player_id,
  p."memberId" as member_id,
  gsgp.description as skill_group,
  mle_p.team_name as franchise,
  case
    when mle_p.id = t.franchise_manager_id then 'Franchise Manager'
    when mle_p.id = t.general_manager_id then 'General Manager'
    when mle_p.id = t.doubles_assistant_general_manager_id
    or mle_p.id = t.standard_assistant_general_manager_id then 'Assistant General Manager'
    when mle_p.id = ttc.player_id then 'Captain'
    else 'NA'
  end as "Franchise Staff Position",
  mle_p.role as slot,
  COALESCE(sp.points, 0) as current_scrim_points,
  case
    when ed."Eligible Through" is null then 'Not Eligible'
    else to_char(ed."Eligible Through", 'DD Mon YYYY')
  end as "Eligible Through"
FROM
  sprocket.player p
  INNER JOIN sprocket.member sm ON sm.id = p."memberId"
  INNER JOIN sprocket.user su ON su.id = sm."userId"
  INNER JOIN sprocket.game_skill_group_profile gsgp ON p."skillGroupId" = gsgp."skillGroupId"
  INNER JOIN sprocket.member_profile mp ON p."memberId" = mp."memberId"
  INNER JOIN mledb_bridge.player_to_player bridge_ptp ON bridge_ptp."sprocketPlayerId" = p.id
  INNER JOIN mledb.player mle_p ON bridge_ptp."mledPlayerId" = mle_p.id
  INNER JOIN mledb.team t ON mle_p.team_name = t.name
  LEFT JOIN mledb.team_to_captain ttc ON mle_p.id = ttc.player_id
  LEFT JOIN scrim_points sp ON sp.player_id = mle_p.id
  LEFT JOIN eligibility_date ed ON ed.player_id = mle_p.id
