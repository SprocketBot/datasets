select
  CONCAT(
    'https://report-cards.mlesports.gg/',
    rca."minioKey"
  ) as report_card_url,
  *
from
  sprocket.report_card_asset rca
