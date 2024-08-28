# Permutation in String

Given two strings `s1` and `s2`, determine if `s2` contains any permutation of `s1`. In other words, return `true` if one of `s1`'s permutations is a substring of `s2`, and `false` otherwise.

## Examples

Example 1:
```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

Example 2:
```
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

## Constraints

* `1 <= s1.length, s2.length <= 10^4`
* `s1` and `s2` consist of lowercase English letters.