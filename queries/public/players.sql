SELECT
    mp.name,
    p.salary,
    p.id as sprocket_player_id,
    p."memberId" as member_id,
    gsgp.description as skill_group,
    mle_p.team_name as franchise,
    mle_p.role as slot,
    mle_p.mleid as mle_id,
    mle_p.id as mle_player_id,
    mle_p.discord_id as discord_id
FROM
    sprocket.player p
    INNER JOIN sprocket.member sm ON sm.id = p."memberId"
    INNER JOIN sprocket.user su ON su.id = sm."userId"
    INNER JOIN sprocket.game_skill_group_profile gsgp ON p."skillGroupId" = gsgp."skillGroupId"
    INNER JOIN sprocket.member_profile mp ON p."memberId" = mp."memberId"
    INNER JOIN mledb_bridge.player_to_player bridge_ptp ON bridge_ptp."sprocketPlayerId" = p.id
    INNER JOIN mledb.player mle_p ON bridge_ptp."mledPlayerId" = mle_p.id