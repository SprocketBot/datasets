from prefect import task
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from prefect.blocks.system import Secret


@task(name="Write to Google Sheet")
def write_to_google_sheet(sheet_title: str, data: list[tuple] | tuple[tuple], cols: list[str], service_acct: str):
    #Authorize the API
    client = gspread.auth.service_account_from_dict(json.loads(service_acct))
    sheet = client.open(sheet_title)
    page = sheet.sheet1
    
    

    # Clean up the sheet
    page.clear()
    page.freeze(0)
    if page.col_count > 1:
        page.delete_columns(2, page.col_count)

    if page.row_count > 1:
        page.delete_rows(2, page.row_count)


    clean_data = [ [str(v) for v in row ] for row in data]
    
    all_rows = [cols]
    
    all_rows.extend(clean_data)

    page.insert_rows(all_rows)
    page.freeze(rows=1)

    page.columns_auto_resize(1, page.col_count)

    # TODO: https://pypi.org/project/gspread-formatting/

    return (page.url, sheet.title, len(data))
    

if __name__ == "__main__":
    with open("./sprocket-361723-9fc615628879.json", "r") as file:
        raw_cred = file.read()

        write_to_google_sheet.fn([[1,2],[3,4]], raw_cred)