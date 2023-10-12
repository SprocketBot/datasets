SELECT sg.id           as match_group_id,
       sg.start,
       sg.end,
       sg.description  as match_group_title,
       sg2.description as parent_group_title
FROM sprocket.schedule_group sg
         INNER JOIN sprocket.schedule_group_type sgt on sg."typeId" = sgt.id
         INNER JOIN sprocket.schedule_group sg2 on sg."parentGroupId" = sg2.id
WHERE sgt.code = 'WEEK'
ORDER BY sg.start, sg.end