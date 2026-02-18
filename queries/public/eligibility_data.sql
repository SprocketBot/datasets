SELECT
    ed.id AS eligibility_id
    , ed.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS created_at_est
    , ed.player_id
    , ed.scrim_id
    , ed.scrim_points
FROM
    mledb.eligibility_data ed
WHERE
    ed.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' >= DATE(NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'  -- Step 1: go back 30 days
    - ((EXTRACT(DOW FROM (DATE(NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York') - INTERVAL '30 DAYS'))::int + 6) % 7) * INTERVAL '1 day' -- Step 2: go back to first Monday before 30 days
