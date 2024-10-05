## Longest Common Subsequence

Given two strings `text1` and `text2`, return the length of their longest common subsequence (LCS). If there is no common subsequence, return 0.

A subsequence of a string is a sequence of characters that appear in the same order as they do in the original string, but not necessarily consecutively. For example, "ace" is a subsequence of "abcde".

A common subsequence of the two strings is a subsequence that appears in both strings.

## Examples

### Example 1:

```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

### Example 2:

```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

### Example 3:

```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no common subsequence, so the result is 0.
```

## Constraints
* 1 <= text1.length, text2.length <= 1000
* `text1` and `text2` consist of only lowercase English characters.