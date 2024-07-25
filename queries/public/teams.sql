select
	fgp_conf."name" as "Conference",
	fgp_sd."name" as "Super Division",
	fgp."name" as "Division",
	fp.title as "Franchise",
	fp.code as "Code",
	fp."primaryColor" as "Primary Color",
	fp."secondaryColor" as "Secondary Color",
	p.url as "Photo URL"
from
	sprocket.franchise_group fg
join sprocket.franchise_group_profile fgp on
	fgp."groupId" = fg.id
join sprocket.franchise_group_assignment fga on
	fga."groupId" = fg.id
join sprocket.franchise_profile fp on
	fp."franchiseId" = fga."franchiseId"
join sprocket.franchise_group fg_sd on
	fg."parentGroupId" = fg_sd.id
join sprocket.franchise_group_profile fgp_sd on
	fg_sd.id = fgp_sd."groupId"
join sprocket.franchise_group fg_conf on
	fg_sd."parentGroupId" = fg_conf.id
join sprocket.franchise_group_profile fgp_conf on
	fg_conf.id = fgp_conf."groupId"
join sprocket.photo p on
	fp."photoId" = p.id 
order by 1,2,3,4
