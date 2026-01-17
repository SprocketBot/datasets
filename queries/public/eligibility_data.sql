SELECT
  *
FROM
  mledb.eligibility_data ed
WHERE
  ed.created_at >= DATE (NOW()) - INTERVAL '31 days'
