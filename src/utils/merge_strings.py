def merge_strings(*strings: str) -> str:
    """
    Merge any number of strings.

    Concatenates given strings into a single string by reducing overlapping parts
    between each adjacent pair of strings.

    Example:
        >>> merge_strings("hello", "ohi", "inew", "world")
        'hellohineworld'
        >>> merge_strings("ab", "bc", "cd", "de")
        'abcde'

    :param strings: The input strings.

    :return: The merged string.
    """
    if not strings:
        return ""

    def find_overlap(a, b):
        """Find the length of the overlap between the end of 'a' and the start of 'b'"""
        end = min(len(a), len(b))
        while end > 0:
            if a[-end:] == b[:end]:
                return end
            end -= 1
        return 0


    merged = strings[0]
    for string in strings[1:]:
        overlap = find_overlap(merged, string)
        merged += string[overlap:]
    return merged