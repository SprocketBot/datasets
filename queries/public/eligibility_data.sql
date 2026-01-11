SELECT
    *
FROM mledb.eligibility_data ed
WHERE ed."createdAt" >= DATE(NOW()) - INTERVAL '31 days'
