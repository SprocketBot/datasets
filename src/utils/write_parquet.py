import atexit
import tempfile
import pyarrow
from pyarrow import parquet
from typing import Callable, Optional


def write_parquet(data: list[dict], outpath: Optional[str] = None) -> (str, Callable[[], None]):
    tmp = None
    if outpath is None:
        tmp = tempfile.NamedTemporaryFile()
        outpath = tmp.name

        # Make sure we delete the tmp file when the process shuts down
        def cleanup():
            if not tmp.closed:
                tmp.close()

        atexit.register(cleanup)


    table = pyarrow.Table.from_pylist(data)
    parquet.write_table(table, outpath)

    return outpath, tmp.close if tmp else None
