---
examples:
  - title: Scrim report cards for a player
    query: |
      SELECT * FROM %file WHERE player_name = 'ExamplePlayer';
  - title: Scrim report cards for a league
    query: |
      SELECT * FROM %file WHERE league = 'CL';
---

Scrim report card assets (one row per report-card player). Includes league/mode metadata and a public image URL.
