---
examples:
  - title: Match report cards for a team
    query: |
      SELECT * FROM %file WHERE home_team = 'Ducks' OR away_team = 'Ducks';
  - title: Match report cards for a player
    query: |
      SELECT * FROM %file WHERE player_name = 'ExamplePlayer';
---

Match report card assets (one row per report-card player). Includes home/away teams, league/mode metadata, and a public image URL.
