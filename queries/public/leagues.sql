SELECT
	gsg.id AS skill_group_id
	, gsgp.code AS league_code
	, gsgp.description AS league_name
	, gsgp.color
	, p.url AS league_photo_url
	, gsgp."discordEmojiId" AS discord_emoji
	, sc.max_salary

FROM sprocket.game_skill_group gsg

LEFT JOIN sprocket.game_skill_group_profile gsgp
	ON gsg.id = gsgp."skillGroupId"

LEFT JOIN sprocket.photo p
	ON gsgp."photoId" = p.id
	
LEFT JOIN mledb_bridge.league_to_skill_group ltsg
	ON gsg.id = ltsg."skillGroupId"
	
LEFT JOIN mledb.salary_cap sc
	ON ltsg.league = sc.league
	
WHERE gsg."gameId" = 7 --this is the id for Rocket League, Trackmania is 8 if needed in the future
