import os

from typing_extensions import Callable, TypeVar

T = TypeVar('T')


def walk_dir(root: str, file_fn: Callable[[str, str], T] = None, dir_fn: Callable[[str, str], T] = None) -> list[T]:
    """
    :param root: the root directory where the directory tree walk begins
    :param file_fn: a function that will be called for each file found during the walk.
                    The function should accept two parameters: the root directory and the file name.
    :param dir_fn: A function that will be called for each directory found during the walk.
                    The function should accept two parameters: the root directory and the directory name.
    :return: List containing the results of the functions

    This method walks a directory tree starting from the given root directory. It calls the specified file_fn function
    for each file found, passing the root directory and file name as parameters. It also calls the specified dir_fn
    function for each directory found, passing the root directory and directory name as parameters.
    """
    for root, dirs, files in os.walk(root):
        results = []
        if file_fn:
            for file in files:
                results.append(file_fn(root, file))
        if dir_fn:
            for directory in dirs:
                results.append(dir_fn(root, directory))

        return results
