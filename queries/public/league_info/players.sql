SELECT p."memberId" as member_id,
       mp.name,
       p.salary,
       gsgp.description  as skill_group,
       mle_p.team_name   as franchise,
       mle_p.role as slot
FROM sprocket.player p
         INNER JOIN sprocket.game_skill_group_profile gsgp ON p."skillGroupId" = gsgp."skillGroupId"
         INNER JOIN sprocket.member_profile mp ON p."memberId" = mp."memberId"
         INNER JOIN mledb_bridge.player_to_player bridge_ptp ON bridge_ptp."sprocketPlayerId" = p.id
         INNER JOIN mledb.player mle_p ON bridge_ptp."mledPlayerId" = mle_p.id