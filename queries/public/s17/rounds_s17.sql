select
    m.id as match_id,
    r.id as round_id,
    fph.title as "Home",
    tslh.stats->'stats'->'core'->'goals' as "Home Goals",
    fpa.title as "Away",
    tsla.stats->'stats'->'core'->'goals' as "Away Goals"

from sprocket.round as r
inner join sprocket.match m on m.id = r."matchId"
inner join sprocket.match_parent mp on mp.id = m."matchParentId"
inner join sprocket.schedule_fixture sf on sf.id = mp."fixtureId"
inner join sprocket.schedule_group sg on sg.id = sf."scheduleGroupId"
inner join sprocket.franchise_profile fph on sf."homeFranchiseId" = fph."franchiseId"
inner join sprocket.franchise_profile fpa on sf."awayFranchiseId" = fpa."franchiseId"
inner join sprocket.team_stat_line tslh on (tslh."roundId" = r.id and tslh."teamName" = fph.title)
inner join sprocket.team_stat_line tsla on (tsla."roundId" = r.id and tsla."teamName" = fpa.title)

where sg."parentGroupId" = 219
