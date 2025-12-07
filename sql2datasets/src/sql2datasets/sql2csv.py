#!/usr/bin/env python3

"""
sql2csv   - SQL to CSV converter
Copyright - (C) 2025 Rudra / VeeraBhadraReddy / cosmoid / Andy Freeman
License   - MIT
"""

import argparse
import logging
import os
from importlib.metadata import distribution, version
from typing import Dict, List, Optional

import boto3
import pandas as pd
import psycopg2
from botocore.exceptions import ClientError
from dotenv import load_dotenv

# Configure logging with proper formatting
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


# Add logging for successful database connections
def log_database_connection_success(host: str, port: int, database: str):
    logger.info(
        f"Successfully connected to PostgreSQL database at {host}:{port}/{database}"
    )


# Add logging for successful S3 uploads
def log_s3_upload_success(file_name: str):
    logger.info(
        f"Successfully uploaded {file_name} to S3 bucket {os.getenv('S3_BUCKET_NAME')}"
    )


def run_sql_script(
    file_path: str, db_credentials: Dict[str, str], ca_cert_path: Optional[str] = None
) -> Optional[pd.DataFrame]:
    """
    Executes an SQL script using the provided credentials and returns a DataFrame.

    This function connects to a PostgreSQL database using psycopg2 and executes
    the SQL script from the provided file path, returning results as a pandas DataFrame.

    Args:
        file_path (str): Path to the SQL script file.
        db_credentials (dict): Database credentials containing host, user, password, and database name.
        ca_cert_path (str, optional): Path to PostgreSQL CA certificate file for SSL connection.

    Returns:
        pd.DataFrame: DataFrame containing query results, or None if no results.

    Raises:
        psycopg2.Error: If database connection or query execution fails.
    """
    logger.info(f"  Executing SQL script: {file_path}")
    try:
        # Connect to PostgreSQL database
        logger.info(
            f"    Connecting to database at {db_credentials['host']}:{db_credentials['port']}"
        )

        # Set SSL mode based on environment variable or default to 'require'
        ssl_mode = os.getenv("PGSSLMODE", "require")
        connection_params = {
            "host": db_credentials["host"],
            "user": db_credentials["user"],
            "password": db_credentials["password"],
            "database": db_credentials["database"],
            "port": db_credentials["port"],
            "sslmode": ssl_mode,
        }

        # Add sslrootcert parameter if CA certificate is provided
        if ca_cert_path:
            connection_params["sslrootcert"] = ca_cert_path

        connection = psycopg2.connect(**connection_params)

        # Log successful connection
        log_database_connection_success(
            db_credentials["host"], db_credentials["port"], db_credentials["database"]
        )

        # Read the SQL script file
        logger.debug("    Reading SQL script file")
        with open(file_path, "r") as sql_file:
            sql_script = sql_file.read()

        # Execute the SQL script and load results into DataFrame
        logger.debug("    Executing SQL script")
        df = pd.read_sql_query(sql_script, connection)

        # Close connection
        connection.close()

        logger.info("  SQL script executed successfully")
        return df
    except psycopg2.Error as e:
        logger.error(f"Error running SQL script {file_path}: {e}")
        raise
    except Exception as e:
        logger.error(f"Error processing SQL script {file_path}: {e}")
        raise


def upload_to_s3(file_name: str, file_path: str) -> None:
    """
    Uploads a file to an S3 bucket using AWS credentials from environment variables.

    This function creates an S3 client using the AWS access key and secret key
    retrieved from environment variables. It then uploads the specified file to
    the S3 bucket identified by the S3_BUCKET_NAME environment variable.

    Args:
        file_name (str): Name of the file to upload.
        output_dir (str): Directory containing the file to upload.

    Raises:
        Exception: If the upload to S3 fails.
    """
    logger.info(f"  Uploading file to S3: {file_name}")
    try:
        # Retrieve AWS credentials from environment variables
        # These credentials are typically set using a .env file or exported environment variables
        # On very new attempt, the bucket does not exist
        bucket_exists: bool = False
        do_s3_bucket = os.getenv("S3_BUCKET_NAME")
        region = os.getenv("DO_REGION_NAME")

        s3 = boto3.client(
            "s3",
            region_name=region,
            aws_access_key_id=os.getenv("DO_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("DO_SECRET_ACCESS_KEY"),
            endpoint_url=os.getenv("DO_ENDPOINT_URL"),
        )
        # Construct the full path to the file to be uploaded
        # file_path = os.path.join(output_dir, file_name)
        # Upload the file to the specified S3 bucket with public-read ACL
        logger.info(
            f"    Uploading {file_path} to S3 bucket {os.getenv('S3_BUCKET_NAME')}"
        )

        # See if bucket exists
        try:
            logger.info(f"    Checking to see if {do_s3_bucket} S3 bucket exists")
            s3.head_bucket(Bucket=do_s3_bucket)
            bucket_exists = True
            logger.info(f"Bucket {do_s3_bucket} exists.")
        except ClientError as e:
            if e.response["Error"]["Code"] == "404":
                logger.info(f"Bucket {do_s3_bucket} does not exist. Creating it")
                s3.create_bucket(Bucket=do_s3_bucket)
                bucket_exists = True
            else:
                logger.error(f"Error checking bucket: {e}")
                raise

        # If bucket exists
        # Disable Current ACL Perms
        if bucket_exists:
            # Disable public access blocks (allows public ACLs)
            s3.put_public_access_block(
                Bucket=do_s3_bucket,
                PublicAccessBlockConfiguration={
                    "BlockPublicAcls": False,
                    "IgnorePublicAcls": False,
                    "BlockPublicPolicy": False,
                    "RestrictPublicBuckets": False,
                },
            )
            logger.info(
                f"Public access block settings disabled for bucket {do_s3_bucket}"
            )

            # Set ownership to ObjectWriter (uploader sets ACLs)
            s3.put_bucket_ownership_controls(
                Bucket=do_s3_bucket,
                OwnershipControls={
                    "Rules": [{"ObjectOwnership": "ObjectWriter"}],
                },
            )
            logger.info(f"Ownership controls set for bucket {do_s3_bucket}")

            # Set bucket ACL to public-read
            s3.put_bucket_acl(Bucket=do_s3_bucket, ACL="public-read")
            logger.info(f"Bucket ACL set to 'public-read' for {do_s3_bucket}")

            # Set to only public-read
            s3.upload_file(
                file_path,
                os.getenv("S3_BUCKET_NAME"),
                file_name,
                ExtraArgs={"ACL": "public-read"},
            )

            # Log successful upload
            log_s3_upload_success(file_name)
    except Exception as e:
        # Print an error message if the upload fails
        logger.error(f"Error uploading {file_name} to S3: {e}")
        raise


def parse_pgpass_file(pgpass_file_path: Optional[str]) -> Dict[str, str]:
    """
    Parse a PostgreSQL .pgpass file and return credentials.

    The .pgpass file format is: hostname:port:database:username:password
    This function reads the file and returns the first matching entry.

    Args:
        pgpass_file_path (str): Path to the .pgpass file

    Returns:
        dict: Database credentials (host, port, user, password, database)
    """
    # Default values
    credentials = {
        "host": os.getenv("PGHOST", "localhost"),
        "port": int(os.getenv("PGPORT", 5432)),
        "user": os.getenv("PGUSER"),
        "password": os.getenv("PGPASSWORD"),
        "database": os.getenv("PGDATABASE"),
    }

    # If no pgpass file specified, return default credentials
    if not pgpass_file_path:
        return credentials

    try:
        # Read the .pgpass file
        with open(pgpass_file_path, "r") as f:
            for line in f:
                line = line.strip()
                # Skip empty lines and comments
                if not line or line.startswith("#"):
                    continue

                # Parse the line: hostname:port:database:username:password
                parts = line.split(":")
                if len(parts) >= 5:
                    # For simplicity, we'll use the first matching entry
                    # In a real implementation, you might want to match by hostname
                    credentials = {
                        "host": parts[0],
                        "port": int(parts[1]) if parts[1] else 5432,
                        "database": parts[2],
                        "user": parts[3],
                        "password": parts[4],
                    }
                    break
    except Exception as e:
        logger.error(f"Error reading .pgpass file {pgpass_file_path}: {e}")
        # Return default credentials if file reading fails
        pass

    return credentials


def generate_html_index(args, dataset_files: List[Dict[str, str]], base_url: str) -> str:
    """
    Generate an HTML index file with dataset names and links to CSV, JSON, and Parquet files.

    Args:
        args: Command line arguments
        dataset_files: List of dictionaries with format-to-filename mappings
        base_url: Base URL for constructing file links

    Returns:
        str: HTML content
    """
    # Create the HTML content for a multi-column table
    html_content = """<!DOCTYPE html>
<html>
<head>
    <title>Dataset Files Index</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        a { text-decoration: none; color: #0066cc; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Dataset Files Index</h1>
    <table>
        <thead>
            <tr>
                <th>Dataset</th>
                <th>CSV</th>
                <th>JSON</th>
                <th>Parquet</th>
            </tr>
        </thead>
        <tbody>
"""

    # Add rows for each dataset with links to all formats
    for file_dict in dataset_files:
        if not file_dict:  # Skip empty dictionaries
            continue

        # Extract base name from any of the files
        base_name = None
        for fmt, filename in file_dict.items():
            base_name = filename.replace(f".{fmt}", "")
            break

        if not base_name:
            continue

        html_content += f"            <tr>\n"
        html_content += f"                <td><strong>{base_name}</strong></td>\n"

        # Add links for each format
        for fmt in ['csv', 'json', 'parquet']:
            if fmt in file_dict:
                full_url = f"https://{base_url}/{file_dict[fmt]}"
                html_content += f'                <td><a href="{full_url}" target="_blank">{fmt.upper()}</a></td>\n'
            else:
                html_content += f"                <td>-</td>\n"

        html_content += f"            </tr>\n"

    # Close the HTML
    html_content += """        </tbody>
    </table>
</body>
</html>"""

    return html_content


def process_sql_file(file_path: str, args, output_dir: str, input_sql_dir: str) -> Dict[str, str]:
    """
    Process a single SQL file and export to CSV, JSON, and Parquet formats.

    Args:
        file_path (str): Path to the SQL file
        args: Command line arguments
        output_dir (str): Output directory for output files
        input_sql_dir (str): Input directory containing SQL files

    Returns:
        Dict[str, str]: Dictionary mapping format to file name (e.g., {'csv': 'file.csv', 'json': 'file.json'})
    """
    logger.info(f"  Processing file: {os.path.basename(file_path)}")
    try:
        # Get database credentials
        db_credentials = parse_pgpass_file(args.pgsql_creds_file)

        # Execute the SQL script and get DataFrame
        df = run_sql_script(
            file_path,
            db_credentials,
            args.pgsql_ca_crt,
        )

        # If no results, skip file
        if df is None or df.empty:
            logger.warning(f"  No results returned from {file_path}, skipping")
            return {}

        # Generate base file name
        file_name = os.path.basename(file_path)
        base_name = file_name.replace(".sql", "")

        # Determine output directory path based on recursive behavior
        if not args.no_recursive:
            # Preserve directory structure in output for recursive behavior
            relative_path = os.path.relpath(os.path.dirname(file_path), input_sql_dir)
            if relative_path == ".":
                output_subdir = output_dir
            else:
                output_subdir = os.path.join(output_dir, relative_path)
        else:
            # Non-recursive: no directory structure preservation
            output_subdir = output_dir

        # Create output directory if it doesn't exist
        os.makedirs(output_subdir, exist_ok=True)

        # Dictionary to store exported file names
        exported_files = {}

        # Export to CSV
        csv_file_name = f"{base_name}.csv"
        csv_file_path = os.path.join(output_subdir, csv_file_name)
        logger.debug(f"  Writing CSV output to: {csv_file_path}")
        df.to_csv(csv_file_path, index=False)
        upload_to_s3(csv_file_name, csv_file_path)
        exported_files['csv'] = csv_file_name

        # Export to JSON
        json_file_name = f"{base_name}.json"
        json_file_path = os.path.join(output_subdir, json_file_name)
        logger.debug(f"  Writing JSON output to: {json_file_path}")
        df.to_json(json_file_path, orient='records', indent=2)
        upload_to_s3(json_file_name, json_file_path)
        exported_files['json'] = json_file_name

        # Export to Parquet
        parquet_file_name = f"{base_name}.parquet"
        parquet_file_path = os.path.join(output_subdir, parquet_file_name)
        logger.debug(f"  Writing Parquet output to: {parquet_file_path}")
        df.to_parquet(parquet_file_path, index=False)
        upload_to_s3(parquet_file_name, parquet_file_path)
        exported_files['parquet'] = parquet_file_name

        logger.info(f"  File {file_name} processed successfully (CSV, JSON, Parquet)")
        return exported_files
    except Exception as e:
        logger.error(f"Error processing file {file_path}: {e}")
        raise


def main() -> None:
    """
    Main function to process SQL files and upload them to S3.

    This function parses command-line arguments, processes each SQL file in the input directory,
    converts the output to CSV format, and uploads the CSV files to S3. It also handles
    optional credential files and version information.

    Args:
        None (uses command-line arguments and environment variables)
    """
    # Set up argument parser for command-line options
    parser = argparse.ArgumentParser(
        description="Process SQL scripts, run queries and store resutls in CSV format and upload them to S3."
    )

    # Required arguments
    parser.add_argument("--input-sql-dir", help="Directory containing .sql files")
    parser.add_argument("--output-dir", help="Output directory for CSV files")
    parser.add_argument(
        "--pgsql-creds-file",
        help="Path to .pgsql credentials file",
    )
    parser.add_argument(
        "--aws-creds-file",
        help="Path to AWS credentials .env file",
    )

    # Optional arguments group
    optional_args = parser.add_argument_group("optional arguments")

    optional_args.add_argument(
        "--no-recursive",
        action="store_true",
        help="Do not search input-sql-dir recursively for .sql files (default: False)",
        default=False,
    )
    optional_args.add_argument(
        "--pgsql-ca-crt",
        help="Path to PostgreSQL CA certificate file for SSL connection",
    )
    optional_args.add_argument(
        "--html-loc",
        default="sprocket-public-datasets.nyc3.cdn.digitaloceanspaces.com/datasets",
        required=False,
        help="Base URL for constructing dataset links.",
    )
    optional_args.add_argument(
        "--version",
        action="store_true",
        help="Show version information",
    )

    args = parser.parse_args()

    # Get package metadata from pyproject.toml for version and author information
    dist = distribution("mlepysak")
    package_version = version("mlepysak")
    package_author = dist.metadata["Author"]

    # Display version information if requested
    if args.version:
        print(f"\n{dist.name} v{package_version}\nWritten by {package_author}.")
        exit(0)

    logger.info("Starting SQL to CSV conversion process")
    # Validate required arguments
    if not args.input_sql_dir or not args.output_dir:
        parser.error(
            "--input-sql-dir and --output-dir are required unless --version is specified"
        )

    # Load environment variables from .env file or specified credential files
    load_dotenv()

    # Load optional .pgsql credentials file if specified
    if args.pgsql_creds_file:
        load_dotenv(dotenv_path=args.pgsql_creds_file)

    # Load optional AWS credentials file if specified
    if args.aws_creds_file:
        load_dotenv(dotenv_path=args.aws_creds_file)

    # Process each SQL file in the input directory
    logger.info(f"Processing SQL files in directory: {args.input_sql_dir}")

    # Keep track of processed files for index generation
    dataset_files = []

    def process_sql_files(args):
        """Helper function to process SQL files with recursive or non-recursive behavior."""
        if not args.no_recursive:
            # Recursively search for .sql files (when --no-recursive is NOT specified)
            for root, dirs, files in os.walk(args.input_sql_dir):
                for file in files:
                    if file.endswith(".sql"):
                        file_path = os.path.join(root, file)
                        # Process the file and collect exported file names
                        exported = process_sql_file(
                            file_path, args, args.output_dir, args.input_sql_dir
                        )
                        if exported:
                            dataset_files.append(exported)
        else:
            # Non-recursive behavior (when --no-recursive is specified)
            for file in os.listdir(args.input_sql_dir):
                if file.endswith(".sql"):
                    file_path = os.path.join(args.input_sql_dir, file)
                    # Process the file and collect exported file names
                    exported = process_sql_file(
                        file_path, args, args.output_dir, args.input_sql_dir
                    )
                    if exported:
                        dataset_files.append(exported)

    process_sql_files(args)

    # Generate and upload HTML index file
    if dataset_files:
        logger.info("Generating HTML index file")
        html_content = generate_html_index(args, dataset_files, args.html_loc)

        # Write HTML index to a file
        html_file_path = os.path.join(args.output_dir, "index.html")
        with open(html_file_path, "w") as f:
            f.write(html_content)

        # Upload the HTML index file to S3
        upload_to_s3("index.html", html_file_path)

    logger.info("SQL to CSV conversion process completed")


if __name__ == "__main__":
    main()
