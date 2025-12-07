# sql2datasets

`sql2datasets` is a Python tool that executes SQL queries and exports results to multiple formats (CSV, JSON, Parquet) with S3 upload support.

## Features

- Execute SQL scripts from a directory
- Convert query results to multiple formats: CSV, JSON, and Parquet
- Recursive directory traversal for SQL files
- Optional S3 upload functionality
- SSL mode support for PostgreSQL connections
- Comprehensive logging
- Automated HTML index generation with links to all formats

## Installation

### Prerequisites

- Python 3.11+
- pip (Python package installer)
- PostgreSQL client libraries
- AWS credentials (for S3 uploads)

### Installation Steps

1. **From source**:

   ```bash
   git clone https://github.com/SprocketBot/datasets.git
   cd datasets/sql2datasets
   pip install -e .
   ```

## Usage

### Basic Usage

```bash
sql2csv --input-sql-dir /path/to/sql/files --output-dir /path/to/output
```

### Help Information

```bash
sql2csv --help
```

```bash
usage: sql2csv [-h] [--input-sql-dir INPUT_SQL_DIR] [--output-dir OUTPUT_DIR]
               [--pgsql-creds-file PGSQL_CREDS_FILE]
               [--aws-creds-file AWS_CREDS_FILE] [--no-recursive] [--version]

Process SQL scripts, run queries and export results in CSV, JSON, and Parquet formats, then upload to S3.

optional arguments:
  -h, --help            show this help message and exit
  --input-sql-dir INPUT_SQL_DIR
                        Directory containing .sql files
  --output-dir OUTPUT_DIR
                        Output directory for CSV files
  --pgsql-creds-file PGSQL_CREDS_FILE
                        Path to .pgsql credentials file (optional)
  --aws-creds-file AWS_CREDS_FILE
                        Path to AWS credentials .env file (optional)
  --no-recursive        Do not search input-sql-dir recursively for .sql files (default: False)
  --version             Show version information
```

## Configuration

### Environment Variables

- `PGHOST` - PostgreSQL host (default: localhost)
- `PGPORT` - PostgreSQL port (default: 5432)
- `PGUSER` - PostgreSQL user
- `PGPASSWORD` - PostgreSQL password
- `PGDATABASE` - PostgreSQL database name
- `PGSSLMODE` - PostgreSQL SSL mode (default: require)
- `DO_REGION_NAME` - DigitalOcean region name for S3
- `DO_ACCESS_KEY_ID` - DigitalOcean access key ID
- `DO_SECRET_ACCESS_KEY` - DigitalOcean secret access key
- `DO_ENDPOINT_URL` - DigitalOcean S3 endpoint URL
- `S3_BUCKET_NAME` - S3 bucket name for uploads

### Credential Files

#### PostgreSQL Credentials File

Create a `.pgpass` file or specify a custom credentials file:

```bash
# Format: hostname:port:database:username:password
localhost:5432:mydb:myuser:mypassword
```

#### AWS Credentials File

Create a `.env` file with AWS credentials:

```bash
DO_REGION_NAME=your-region
DO_ACCESS_KEY_ID=your-access-key
DO_SECRET_ACCESS_KEY=your-secret-key
DO_ENDPOINT_URL=https://your-endpoint
S3_BUCKET_NAME=your-bucket-name
```

## Development Setup

### Using pip

1. Install in development mode:

   ```bash
   pip install -e .
   ```

## Libraries Used

- `argparse` - Command-line argument parsing
- `pandas` - Data manipulation and analysis
- `pyarrow` - Apache Arrow/Parquet file format support
- `logging` - Logging functionality
- `os` - Operating system interface
- `psycopg2` - PostgreSQL database adapter
- `boto3` - AWS SDK for Python
- `python-dotenv` - Loading environment variables from .env files
- `typing` - Type hints

## Output Formats

The tool generates three file formats for each SQL query:

1. **CSV** - Properly formatted CSV with correct quoting
2. **JSON** - Records-oriented JSON with indentation
3. **Parquet** - Compressed columnar format for efficient storage

An HTML index file is also generated with links to all formats.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

MIT License - see LICENSE file for details

## Author

Rudra / VeeraBhadraReddy / cosmoid
