select
  mp.id as "MLE Player ID",
  mp.mleid,
  mp.name,
  pa.tracker,
  pa.platform,
  pa.platform_id
from
  mledb.player mp
  inner join mledb.player_account pa on pa.player_id = mp.id
