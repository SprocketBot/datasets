SELECT m.id                                       as match_id,
       sf.id                                      as fixture_id,
       sf."scheduleGroupId"                       as match_group_id,
       home.title                                 as home,
       away.title                                 as away,
       gsgp.description                           as league,
       gm.description                             as game_mode,
       COUNT(DISTINCT r.id) FILTER (WHERE r."homeWon")     as home_wins,
       COUNT(DISTINCT r.id) FILTER (WHERE not r."homeWon") as away_wins,
       CASE
           WHEN COUNT(DISTINCT r.id) = 0 THEN 'Not Played / Data Unavailable'
           WHEN COUNT(DISTINCT r.id) FILTER (WHERE r."homeWon") > COUNT(r.id) FILTER (WHERE not r."homeWon")
               THEN home.title
           else away.title
           end                                    as winning_team
FROM sprocket.schedule_fixture sf
         INNER JOIN sprocket.schedule_group sg on sf."scheduleGroupId" = sg.id
         INNER JOIN sprocket.franchise_profile home on sf."homeFranchiseId" = home."franchiseId"
         INNER JOIN sprocket.franchise_profile away ON sf."awayFranchiseId" = away."franchiseId"
         INNER JOIN sprocket.match_parent mp ON sf.id = mp."fixtureId"
         INNER JOIN sprocket.match m on mp.id = m."matchParentId"
         INNER JOIN sprocket.game_skill_group_profile gsgp ON m."skillGroupId" = gsgp."skillGroupId"
        INNER JOIN sprocket.game_skill_group gsg ON gsgp."skillGroupId" = gsg.id
         INNER JOIN sprocket.game_mode gm on m."gameModeId" = gm.id
         LEFT JOIN sprocket.round r ON m.id = r."matchId"
GROUP BY m.id, home.id, away.id, gsgp.id, sg.start, sg.end, sf.id, gm.id, gsg.ordinal
ORDER BY sg.start, sg.end, sf.id, gm.id, gsg.ordinal;
