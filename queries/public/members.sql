SELECT
    spr_p."memberId" as member_id,
    spr_mp.name,
    mle_p.mleid as mle_id,
    mle_p.id as mle_player_id,
    mle_p.discord_id as discord_id
FROM
    mledb.player mle_p
    INNER JOIN mledb_bridge.player_to_player bridge_ptp ON bridge_ptp."mledPlayerId" = mle_p.id
    INNER JOIN sprocket.player spr_p on bridge_ptp."sprocketPlayerId" = spr_p.id
    INNER JOIN sprocket.member_profile spr_mp on spr_p."memberId" = spr_mp."memberId"