import atexit
import json
import tempfile
import pyarrow
from typing import Callable, Optional


def write_json(data: list[dict], outpath: Optional[str] = None) -> (str, Callable[[], None]):
    tmp = None
    if outpath is None:
        tmp = tempfile.NamedTemporaryFile()
        outpath = tmp.name

        # Make sure we delete the tmp file when the process shuts down
        def cleanup():
            if not tmp.closed:
                tmp.close()

        atexit.register(cleanup)

    table: pyarrow.Table = pyarrow.Table.from_pylist(data)

    with open(outpath, "w") as f:
        f.write(table.to_pandas().to_json(orient="records"))

    return outpath, tmp.close if tmp else None
