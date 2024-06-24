WITH
  scrim_points AS (
    SELECT
      SUM(ed.scrim_points) as points,
      ed.player_id
    FROM
      mledb.eligibility_data ed
    WHERE
      ed.updated_at >= NOW() - INTERVAL '30 days'
    GROUP BY
      2
  ),
captains_by_team as (
select
	player_id,
	team_name
from
	mledb.team_to_captain ttc
    )
SELECT
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
  COALESCE(sp.points, 0) as current_scrim_points
FROM
  sprocket.player p
  INNER JOIN sprocket.member sm ON sm.id = p."memberId"
  INNER JOIN sprocket.user su ON su.id = sm."userId"
  INNER JOIN sprocket.game_skill_group_profile gsgp ON p."skillGroupId" = gsgp."skillGroupId"
  INNER JOIN sprocket.member_profile mp ON p."memberId" = mp."memberId"
  INNER JOIN mledb_bridge.player_to_player bridge_ptp ON bridge_ptp."sprocketPlayerId" = p.id
  INNER JOIN mledb.player mle_p ON bridge_ptp."mledPlayerId" = mle_p.id
  inner join mledb.team t on mle_p.team_name = t.name
  left join mledb.team_to_captain ttc on mle_p.id = ttc.player_id
  LEFT JOIN scrim_points sp ON sp.player_id = mle_p.id
