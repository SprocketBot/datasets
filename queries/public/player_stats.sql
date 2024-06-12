select
	ROUND((stats -> 'dpi' )::numeric, 2) as dpi,
	ROUND((stats -> 'gpi' )::numeric, 2) as gpi,
	ROUND((stats -> 'opi' )::numeric, 2) as opi,
	ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals' )::numeric, 2) as goals,
	ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves' )::numeric, 2) as saves,
        ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'score' )::numeric, 2) as score,
	ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots' )::numeric, 2) as shots,
	ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists' )::numeric, 2) as assists,
	ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against')::numeric, 2) as goals_against,
	ROUND((stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against')::numeric, 2) as shots_against,
	p."memberId" as member_id,
	r.id as round_id,
	r."matchId" as match_id,
	gm.code as gamemode,
	gsgp.description as skill_group,
	sg.id as "Schedule Group ID",
	sg.description as "Schedule Group/Week",
	sg."start" as "Week start"
from
	sprocket.player_stat_line psl
inner join player p on
	psl."playerId" = p.id
inner join round r on
	psl."roundId" = r.id
inner join match m on
	r."matchId" = m.id
inner join match_parent mp on
	m."matchParentId" = mp.id
inner join schedule_fixture sf on
	mp."fixtureId" = sf.id
inner join schedule_group sg on
	sf."scheduleGroupId"  = sg.id
inner join game_mode gm on
	m."gameModeId" = gm.id
inner join game_skill_group_profile gsgp on
	m."skillGroupId" = gsgp."skillGroupId"
