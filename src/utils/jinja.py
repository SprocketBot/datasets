from jinja2 import Environment, FileSystemLoader, select_autoescape
import regex as re
from utils.constants import *

env = Environment(
    loader=FileSystemLoader(templates_path),
    autoescape=select_autoescape(["html", "xml"]),
)


def regex_replace(s, find, replace):
    """A non-optimal implementation of a regex filter"""
    return re.sub(find, replace, s)

env.filters['regex_replace'] = regex_replace