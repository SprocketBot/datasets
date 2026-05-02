# data


## Running Locally:
- Use Python 3.11
  - You can use a docker container to get the correct version of python: `docker run -it --rm --volume .:/app --workdir /app --volume ~/.prefect:/root/.prefect  python:3.11 bash`

- (Only for first time setup) Create a virtual environment: `python -m venv env`

- Enter your virtual environment: `source ./env/bin/activate`

- (Only for first time setup) Install dependencies `pip install -r requirements.txt`

- Ensure you have RolyPoly credentials
  - Use the `/set-password` command in the #commands channel of the Sprocket Discord server if you need to set a password
  - Can check and reset your password using the `/test-login` and `/update-password` commands respectively if you don't remember your password

- Configure Prefect to talk to Sprocket Prefect
  - `prefect config set PREFECT_API_URL="https://[discord username]:[rolypoly password]@prefect.spr.ocket.dev/api"`
  - Note that if you have special characters in your password you will need to URL encode them
    - For example, a `!` will become `%21`

- Test connection with: `prefect deployment ls`
  - There should be at least one item here

- Now you can test all runs with: `python ./src/flows/process-query-directory.py`
  - Check results of test run here: https://sprocket-public-datasets.nyc3.cdn.digitaloceanspaces.com/datasets/test/pages/index.html

## Dev database snapshots

- Create a dev snapshot from GitHub Actions by manually running `Create Dev Database Snapshot`. It uses the existing `PGPASS_CONTENT` and `AWS_CREDS_CONTENT` secrets, writes a timestamped PostgreSQL custom-format dump, and updates `dev-snapshots/postgres/latest.dump` in the datasets Spaces bucket.
- To import from Spaces, install the AWS CLI and provide Spaces credentials via your normal AWS environment or `--aws-creds-file`.
- Import the latest snapshot locally with Docker Postgres:
  - `scripts/import-dev-snapshot.sh --container datasets-postgres --dbname datasets --user postgres --clean --create-db`
- Or import into a local Postgres connection with `pg_restore` installed:
  - `scripts/import-dev-snapshot.sh --host localhost --port 5432 --dbname datasets --user postgres --clean --create-db`
