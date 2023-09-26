SELECT spr_p."memberId" as member_id, p.name as player_name, gsgp.description as skill_group, t.name as team_name FROM mledb.player p
                                                                                                                           INNER JOIN mledb.team t ON p.team_name = t.name
                                                                                                                           INNER JOIN mledb_bridge.player_to_player bridge_p2p ON p.id = bridge_p2p."mledPlayerId"
                                                                                                                           INNER JOIN sprocket.player spr_p ON spr_p.id = bridge_p2p."sprocketPlayerId"
                                                                                                                           INNER JOIN sprocket.game_skill_group_profile gsgp ON spr_p."skillGroupId" = gsgp."skillGroupId"
WHERE division_name != 'Meta'
ORDER BY t.division_name, t.name