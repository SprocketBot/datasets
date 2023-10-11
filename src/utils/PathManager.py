from datetime import datetime

import pytz

data_prefix = "data"
pages_prefix = "pages"
archives_prefix = "archives"


class PathManager:
    """
    This is a helper class to make it easier to reason about paths
    in and out of S3, and to make it easier to quickly find the path
    or url for a type of file.
    """

    def __init__(self, namespace: str, bucket_name: str, public_url_root: str):
        self.namespace = namespace
        self.bucket_name = bucket_name
        self.public_url_root = public_url_root

    def data_path(self):
        return f"{self.namespace}/{data_prefix}"

    def pages_path(self, path_type: str = "s3"):
        if path_type == "s3":
            return f"{self.namespace}/{pages_prefix}"
        elif path_type == "http":
            return f"{self.public_url_root}/{self.namespace}/{pages_prefix}"
        else:
            raise Exception(f"Must provide expected type of path '{path_type}' is not valid.")

    def page_path(self, path: str, path_type: str):
        return f"{self.pages_path(path_type)}/{path}"

    def archives_path(self):
        return f"{self.namespace}/{archives_prefix}"

    def remove_prefixes(self, path: str):
        parts = path.split("/")
        # Remove the bucket name
        if parts[0] == self.bucket_name:
            parts = parts[1:]
        if parts[0] == self.namespace:
            parts = parts[1:]
        # Remove the prefix
        if parts[0] in [data_prefix, pages_prefix, archives_prefix]:
            parts = parts[1:]

        return "/".join(parts)

    @staticmethod
    def change_file_extension(path: str, new_ext: str):
        return f"{'.'.join(path.split('.')[:-1])}.{new_ext}"

    def parquet_glob(self):
        return f"{self.bucket_name}/{self.data_path()}/**/*.parquet"

    def archives_glob(self):
        return f"{self.bucket_name}/{self.archives_path()}/**/*.tar.gz"

    def get_archives_paths(self):
        now = datetime.now(pytz.timezone('US/Eastern'))
        date_string = now.strftime("%Y-%m-%d_%H-00")

        return {
            "current": f"{self.data_path()}/all-datasets.tar.gz",
            "dated": f"{self.archives_path()}/{date_string}.tar.gz"
        }

    def get_page_url_from_parquet(self, parquet_path: str):
        stripped_path = self.remove_prefixes(parquet_path)
        if stripped_path is list:
            stripped_path = stripped_path[0]

        html_path = self.change_file_extension(stripped_path, "html")

        html_url = self.page_path(
            html_path,
            "http"
        )

        return html_url
