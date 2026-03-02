SELECT
    ed.id AS eligibility_id
    , ed."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS created_at_est
    , ed."playerId" AS player_id
    , ed."matchParentId" AS match_parent_id
    , ed.points AS scrim_points
FROM
    sprocket.eligibility_data ed
WHERE
    ed."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' >= DATE(NOW() AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'  -- Step 1: go back 30 days
    - ((EXTRACT(DOW FROM (DATE(NOW() AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'))::int + 6) % 7) * INTERVAL '1 DAY' -- Step 2: go back to first Monday before 30 days
