with
    scrim_points as (
select
	SUM(ed.scrim_points) as points,
	ed.player_id
from
	mledb.eligibility_data ed
where
	ed.updated_at > NOW () - interval '30 days'
group by
	2
    ),
captains_by_team as (
select
	player_id,
	team_name
from
	mledb.team_to_captain ttc
    )
select
	mp.name,
	p.salary,
	p.id as sprocket_player_id,
	p."memberId" as member_id,
	gsgp.description as skill_group,
	mle_p.team_name as franchise,
	case
		when mle_p.id = t.franchise_manager_id then 'Franchise Manager'
		when mle_p.id = t.general_manager_id then 'General Manager'
		when mle_p.id = t.doubles_assistant_general_manager_id
		or mle_p.id = t.standard_assistant_general_manager_id then 'Assistant General Manager'
		when mle_p.id = ttc.player_id then 'Captain'
		else 'NA'
	end as "Franchise Staff Position",
	mle_p.role as slot,
	coalesce(sp.points,
	0) as current_scrim_points
from
	sprocket.player p
inner join sprocket.member sm on
	sm.id = p."memberId"
inner join sprocket.user su on
	su.id = sm."userId"
inner join sprocket.game_skill_group_profile gsgp on
	p."skillGroupId" = gsgp."skillGroupId"
inner join sprocket.member_profile mp on
	p."memberId" = mp."memberId"
inner join mledb_bridge.player_to_player bridge_ptp on
	bridge_ptp."sprocketPlayerId" = p.id
inner join mledb.player mle_p on
	bridge_ptp."mledPlayerId" = mle_p.id
inner join mledb.team t on
	mle_p.team_name = t.name
left join mledb.team_to_captain ttc on
	mle_p.id = ttc.player_id
left join scrim_points sp on
	sp.player_id = mle_p.id
