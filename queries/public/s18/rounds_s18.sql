select
    -- Get serie and game id
    m.id as match_id,
    r.id as round_id,

    -- Get home team name
    fph.title as home,

    -- Get home goals from team stats or 0 if NCP
    CASE
        WHEN r."invalidationId" IS NOT NULL OR
        m."invalidationId" IS NOT NULL OR
        tslh.stats IS NULL THEN 0
        ELSE (tslh.stats->'stats'->'core'->'goals')::INT
    END as home_goals,

    -- Get away team name
    fpa.title as away,

    -- Get away goals from team stats or 0 if NCP
    CASE
        WHEN r."invalidationId" IS NOT NULL OR
        m."invalidationId" IS NOT NULL OR
        tsla.stats IS NULL THEN 0
        ELSE (tsla.stats->'stats'->'core'->'goals')::INT
    END as away_goals,

    -- Get winner team name
    CASE
        WHEN r."homeWon" THEN fph.title
        ELSE fpa.title
    END as winner,

    -- If invalidation is filled in either serie or game, consider this game NCP
    r."invalidationId" IS NOT NULL OR m."invalidationId" IS NOT NULL as is_ncp

from sprocket.round as r
inner join sprocket."match" m on m.id = r."matchId" -- match in quotation to avoid syntax warning
inner join sprocket.match_parent mp on mp.id = m."matchParentId"
inner join sprocket.schedule_fixture sf on sf.id = mp."fixtureId"
inner join sprocket.schedule_group sg on sg.id = sf."scheduleGroupId"
inner join sprocket.franchise_profile fph on sf."homeFranchiseId" = fph."franchiseId"
inner join sprocket.franchise_profile fpa on sf."awayFranchiseId" = fpa."franchiseId"

-- We want to add the team stats if they exist, so left join
left join sprocket.team_stat_line tslh on (tslh."roundId" = r.id and tslh."teamName" = fph.title)
left join sprocket.team_stat_line tsla on (tsla."roundId" = r.id and tsla."teamName" = fpa.title)

-- Season 18 ID is 291
where sg."parentGroupId" = 291

-- Order by series then individual games id
order by
    m.id,
    r.id