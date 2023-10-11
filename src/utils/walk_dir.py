import os

from typing import Callable


def walk_dir(root: str, file_fn: Callable = None, dir_fn: Callable = None, **kwargs) -> list:
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
                results.append(file_fn(root, file, **kwargs))
        if dir_fn:
            for directory in dirs:
                results.append(dir_fn(root, directory, **kwargs))

        return [r for r in results if r is not None]


async def walk_dir_async(root: str, file_fn: Callable = None, dir_fn: Callable = None, **kwargs) -> list:
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
                results.append(await file_fn(root, file, **kwargs))
        if dir_fn:
            for directory in dirs:
                results.append(await dir_fn(root, directory, **kwargs))

        return [r for r in results if r is not None]
