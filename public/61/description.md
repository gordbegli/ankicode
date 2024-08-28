# Palindrome Partitioning

Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`. A palindrome is a substring that reads the same backwards as forwards.

## Examples

Example 1:
```
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

Example 2:
```
Input: s = "a"
Output: [["a"]]
```

## Constraints

* 1 <= s.length <= 16
* s contains only lowercase English letters.

## Notes

* You may assume that the input string will always have at least one valid partition.
* Pay special attention to edge cases like a single character string or a string with all identical characters.