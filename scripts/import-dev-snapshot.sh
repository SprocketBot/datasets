#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: scripts/import-dev-snapshot.sh [options]

Downloads a PostgreSQL custom-format dev snapshot from DigitalOcean Spaces and imports it.

Options:
  --container NAME       Import into a Docker Postgres container using docker exec.
  --host HOST            Postgres host for a local connection (default: localhost).
  --port PORT            Postgres port for a local connection (default: 5432).
  --dbname NAME          Target database name (default: postgres).
  --user USER            Target database user (default: postgres).
  --snapshot KEY         S3 object key to download (default: dev-snapshots/postgres/latest.dump).
  --bucket NAME          Spaces bucket (default: sprocket-public-datasets).
  --endpoint-url URL     S3-compatible endpoint (default: https://nyc3.digitaloceanspaces.com).
  --aws-creds-file PATH  AWS credentials file to use for download.
  --dump-file PATH       Use an existing local dump, or where to save a downloaded dump.
  --clean                Drop database objects before recreating them during restore.
  --create-db            Create target database before restoring.
                          For local connections, restores via maintenance database 'postgres'.
                          For Docker mode, creates the database with psql first.
  --no-owner             Do not restore object ownership (default).
  -h, --help             Show this help message.

Examples:
  scripts/import-dev-snapshot.sh --container datasets-postgres --dbname datasets --user postgres
  scripts/import-dev-snapshot.sh --host localhost --port 5432 --dbname datasets --user postgres
USAGE
}

container=""
host="localhost"
port="5432"
dbname="postgres"
user="postgres"
snapshot_key="dev-snapshots/postgres/latest.dump"
bucket="sprocket-public-datasets"
endpoint_url="https://nyc3.digitaloceanspaces.com"
aws_creds_file=""
dump_file=""
clean="false"
create_db="false"
no_owner="true"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --container)
      container="${2:-}"
      shift 2
      ;;
    --host)
      host="${2:-}"
      shift 2
      ;;
    --port)
      port="${2:-}"
      shift 2
      ;;
    --dbname)
      dbname="${2:-}"
      shift 2
      ;;
    --user)
      user="${2:-}"
      shift 2
      ;;
    --snapshot)
      snapshot_key="${2:-}"
      shift 2
      ;;
    --bucket)
      bucket="${2:-}"
      shift 2
      ;;
    --endpoint-url)
      endpoint_url="${2:-}"
      shift 2
      ;;
    --aws-creds-file)
      aws_creds_file="${2:-}"
      shift 2
      ;;
    --dump-file)
      dump_file="${2:-}"
      shift 2
      ;;
    --clean)
      clean="true"
      shift
      ;;
    --create-db)
      create_db="true"
      shift
      ;;
    --no-owner)
      no_owner="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

if [[ -z "${dump_file}" ]]; then
  require_command aws
  dump_file="$(mktemp -t datasets-dev-snapshot.XXXXXX.dump)"
  if [[ -n "${aws_creds_file}" ]]; then
    export AWS_SHARED_CREDENTIALS_FILE="${aws_creds_file}"
  fi
  echo "Downloading s3://${bucket}/${snapshot_key} to ${dump_file}"
  aws --endpoint-url "${endpoint_url}" s3 cp "s3://${bucket}/${snapshot_key}" "${dump_file}"
else
  if [[ ! -f "${dump_file}" ]]; then
    require_command aws
    if [[ -n "${aws_creds_file}" ]]; then
      export AWS_SHARED_CREDENTIALS_FILE="${aws_creds_file}"
    fi
    echo "Downloading s3://${bucket}/${snapshot_key} to ${dump_file}"
    aws --endpoint-url "${endpoint_url}" s3 cp "s3://${bucket}/${snapshot_key}" "${dump_file}"
  fi
fi

restore_args=(--verbose --dbname "${dbname}")
if [[ "${clean}" == "true" ]]; then
  restore_args+=(--clean --if-exists)
fi
if [[ "${create_db}" == "true" ]]; then
  restore_args+=(--create)
fi
if [[ "${no_owner}" == "true" ]]; then
  restore_args+=(--no-owner --no-privileges)
fi

if [[ -n "${container}" ]]; then
  require_command docker
  if [[ "${create_db}" == "true" ]]; then
    echo "Creating database ${dbname} in Docker container ${container} if needed"
    docker exec -i "${container}" psql --username "${user}" --dbname postgres -v ON_ERROR_STOP=1 -c "SELECT 'CREATE DATABASE \"${dbname}\"' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${dbname}')\gexec"
    restore_args=(--verbose --dbname "${dbname}")
    if [[ "${clean}" == "true" ]]; then
      restore_args+=(--clean --if-exists)
    fi
    if [[ "${no_owner}" == "true" ]]; then
      restore_args+=(--no-owner --no-privileges)
    fi
  fi
  echo "Importing ${dump_file} into Docker container ${container} database ${dbname}"
  docker exec -i "${container}" pg_restore --username "${user}" "${restore_args[@]}" < "${dump_file}"
else
  require_command pg_restore
  if [[ "${create_db}" == "true" ]]; then
    restore_args=(--verbose --dbname postgres --create)
    if [[ "${clean}" == "true" ]]; then
      restore_args+=(--clean --if-exists)
    fi
    if [[ "${no_owner}" == "true" ]]; then
      restore_args+=(--no-owner --no-privileges)
    fi
  fi
  echo "Importing ${dump_file} into ${user}@${host}:${port}/${dbname}"
  pg_restore --host "${host}" --port "${port}" --username "${user}" "${restore_args[@]}" "${dump_file}"
fi

print_msg="Import completed"
if [[ "${dump_file}" == /tmp/* || "${dump_file}" == /var/folders/* ]]; then
  print_msg+="; downloaded dump remains at ${dump_file}"
fi
echo "${print_msg}"
