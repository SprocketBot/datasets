def extract_bucket_name(base: str):
    return base.split("/")[-1]


bucket_data_prefix = "data"
bucket_pages_prefix = "pages"
bucket_archives_prefix = "archives"


def get_ns_data_path(ns: str):
    return f"{ns}/{bucket_data_prefix}"


def get_ns_pages_path(ns: str):
    return f"{ns}/{bucket_pages_prefix}"


def get_ns_archives_path(ns: str):
    return f"{ns}/{bucket_archives_prefix}"
