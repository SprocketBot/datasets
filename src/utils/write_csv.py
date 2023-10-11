import atexit
import tempfile
import pyarrow
from typing import Callable, Optional


def write_csv(data: list[dict], outpath: Optional[str] = None) -> (str, Callable[[], None]):
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

    output_lines = []

    output_lines.append(",".join([field.name for field in table.schema]))

    for row in table.to_pylist():
        output_lines.append(",".join([str(row[field.name]) for field in table.schema]))

    with open(outpath, "w") as f:
        f.write("\n".join(output_lines))

    return outpath, tmp.close if tmp else None
