from prefect.filesystems import RemoteFileSystem
from typing import cast
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
root_query_path = os.path.join(dir_path, "..", "..", "queries")

# DEPRECATED
query_path = os.path.join(root_query_path, "public")

assets_path = os.path.join(dir_path, "..", "..", "assets")
templates_path = os.path.join(dir_path, "..", "templates")
