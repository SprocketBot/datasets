WITH avg_player_stats AS (
SELECT
"displayName" AS name
,p."memberId" AS member_id
,gm.code AS gamemode
,gsgp.description AS skill_group
,tsl."teamName" AS team_name
,sg2.description AS season
,count (*) AS games_played
,AVG(round((psl.stats -> 'gpi')::numeric, 2)) AS sprocket_rating
,AVG(round((psl.stats -> 'dpi')::numeric, 2)) AS dpi_per_game
,AVG(round((psl.stats -> 'opi')::numeric, 2)) AS opi_per_game
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'score'
    )::numeric, 2
  )) AS avg_score
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'
    )::numeric, 2
  )) AS goals_per_game
,SUM(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals'
    )::numeric, 2
  )) AS total_goals
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'
    )::numeric, 2
  )) AS saves_per_game
,SUM(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'saves'
    )::numeric, 2
  )) AS total_saves
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'
    )::numeric, 2
  )) AS shots_per_game
,SUM(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots'
    )::numeric, 2
  )) AS total_shots
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'
    )::numeric, 2
  )) AS assists_per_game
,SUM(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'assists'
    )::numeric, 2
  )) AS total_assists
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against'
    )::numeric, 2
  )) AS avg_goals_against
,SUM(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'goals_against'
    )::numeric, 2
  )) AS total_goals_against
,AVG(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against'
    )::numeric, 2
  )) AS avg_shots_against
,SUM(round(
    (
      psl.stats -> 'otherStats' -> 'stats' -> 'core' -> 'shots_against'
    )::numeric, 2
  )) AS total_shots_against
,AVG(round(
  	(
  	 psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'inflicted'
  )::numeric, 2
  )) AS avg_demos_inflicted
,SUM(round(
  	(
  	 psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'inflicted'
  )::numeric, 2
  )) AS total_demos_inflicted
,AVG(round(
  	(
  	 psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'taken'
  )::numeric, 2
  )) AS avg_demos_taken
,SUM(round(
  	(
  	 psl.stats -> 'otherStats' -> 'stats' -> 'demo' -> 'taken'
  )::numeric, 2
  )) AS total_demos_taken
FROM sprocket.player_stat_line psl
    INNER JOIN sprocket.player p 
        ON psl."playerId" = p.id
    INNER JOIN sprocket.round r 
        ON psl."roundId" = r.id
    INNER JOIN sprocket.match m 
        ON r."matchId" = m.id
    INNER JOIN sprocket.game_mode gm 
        ON m."gameModeId" = gm.id
    INNER JOIN sprocket.game_skill_group_profile gsgp 
        ON m."skillGroupId" = gsgp."skillGroupId"
    INNER JOIN sprocket.team_stat_line tsl 
        ON psl."teamStatsId" = tsl.id
    INNER JOIN sprocket."member"
		ON p."memberId" = sprocket."member".id 
    INNER JOIN sprocket."user"
		ON sprocket.member."userId" = sprocket.user.id 
    INNER JOIN sprocket.user_profile 
		ON sprocket.user.id = sprocket.user_profile."userId"
    INNER JOIN sprocket.match_parent mp 
        ON mp.id = m."matchParentId"
    INNER JOIN sprocket.schedule_fixture sf 
        ON mp."fixtureId" = sf.id
    INNER JOIN sprocket.schedule_group sg 
        ON sf."scheduleGroupId" = sg.id
    INNER JOIN sprocket.schedule_group sg2 
    	ON sg."parentGroupId" = sg2.id
GROUP BY "displayName"
,salary
,member_id
,gamemode
,skill_group
,team_name
,season
  )
SELECT * FROM avg_player_stats