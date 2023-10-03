SELECT t.division_name, t.name, t.callsign, tb.logo_img_link, tb.primary_color, tb.secondary_color FROM mledb.team t
                                                                                                            INNER JOIN mledb.team_branding tb on t.branding_id = tb.id
WHERE division_name != 'Meta'
