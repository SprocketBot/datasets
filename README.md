# data


## Running Locally:
- Use Python 3.11
  - You can use a docker container to get the correct version of python: `docker run -it --rm --volume .:/app --workdir /app --volume ~/.prefect:/root/.prefect  python:3.11 bash`
- Create a venv (python -m venv env)
- Enter venv (./env/bin/activate)
- Install dependencies `pip install -r requirements.txt`

- Ensure you have RolyPoly credentials (/set-password in Sprocket server)
- Configure prefect to talk to Sprocket Prefect
    - `prefect config set PREFECT_API_URL="https://[discord username]:[rolypoly password]@prefect.spr.ocket.dev/api"`

- Test connection with `prefect deployment ls`
  - There should be at least one item here

- Now you can test runs with `python ./src/flows/process-query-directory.py`
  - https://f004.backblazeb2.com/file/sprocket-artifacts/test/pages/index.html


