from prefect.filesystems import RemoteFileSystem
from typing_extensions import cast
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
query_path = os.path.join(dir_path, "..", "..", "queries", "public")
assets_path = os.path.join(dir_path, "..", "..", "assets")
templates_path = os.path.join(dir_path, "..", "templates", "sites", "datasets")

s3_fs: RemoteFileSystem = cast(RemoteFileSystem, RemoteFileSystem.load("s3"))

bucket_name = s3_fs.basepath.split("/")[-1]

bucket_data_prefix = "data"