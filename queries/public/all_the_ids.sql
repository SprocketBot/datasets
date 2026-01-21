select
  u.id as sprocket_user_id,
  m.id as sprocket_member_id,
  p.id as sprocket_player_id,
  mlep.id as mledb_player_id,
  mlep.mleid,
  mlep.name as mledb_display_name,
  mp.name as sprocket_display_name
from
  sprocket.user u
  inner join sprocket.member m on m."userId" = u.id
  inner join sprocket.player p on p."memberId" = m.id
  inner join sprocket.member_profile mp on mp."memberId" = m.id
  inner join sprocket.user_authentication_account uaa on uaa."userId" = u.id
  inner join mledb.player mlep on mlep.discord_id = uaa."accountId";
