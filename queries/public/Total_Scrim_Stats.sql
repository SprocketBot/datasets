select 
"displayName" as name,
sm."createdAt" as scrim_date,
"salary",
 p.id as sprocket_player_id,
 gm.code as gamemode,
 gsgp.description as skill_group,
    (round((psl.stats -> 'dpi')::numeric, 2)) as dpi,
    (round((psl.stats -> 'gpi')::numeric, 2)) as sprocket_rating,
    (round((psl.stats -> 'opi')::numeric, 2)) as opi,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'score'
    )::numeric, 2
  )) as score,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'
    )::numeric, 2
  )) as goals,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'
    )::numeric, 2
  )) as assists,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'
    )::numeric, 2
  )) as saves,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'
    )::numeric, 2
  )) as shots,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against'
    )::numeric, 2
  )) as goals_against,
    (round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against'
    )::numeric, 2
  )) as shots_against,
    (round(
  	(
  	 psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'inflicted'
  )::numeric, 2
  )) as demos
from sprocket.player_stat_line psl 
	  inner join sprocket.player p 
        on psl."playerId" = p.id
    inner join sprocket.round r 
        on psl."roundId" = r.id
    inner join sprocket.match m 
        on r."matchId" = m.id
    inner join sprocket.game_mode gm 
        on m."gameModeId" = gm.id
    inner join sprocket.game_skill_group_profile gsgp 
        on m."skillGroupId" = gsgp."skillGroupId"
    inner join sprocket.team_stat_line tsl 
        on psl."teamStatsId" = tsl.id
    inner join sprocket."member"
		    on p."memberId" = sprocket."member".id 
	  inner join sprocket."user"
		    on sprocket.member."userId" = sprocket.user.id 
	  inner join sprocket.user_profile 
		    on sprocket.user.id = sprocket.user_profile."userId"
    inner join sprocket.match_parent mp 
        on mp.id = m."matchParentId"
    inner join sprocket.scrim_meta sm 
    	  on mp."scrimMetaId" = sm.id 
