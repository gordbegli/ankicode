# Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples

Example 1:
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

Example 2:
```
Input: strs = [""]
Output: [[""]]
```

Example 3:
```
Input: strs = ["a"]
Output: [["a"]]
```

## Constraints:

* 1 <= strs.length <= 10^4
* 0 <= strs[i].length <= 100
* strs[i] consists of lowercase English letters.

## Insights:
1. Clarify edge cases: Discuss edge cases such as an empty string or single-character strings.
2. Diverse test cases: Include various tests to ensure robustness, e.g., an array where all strings are identical.
3. Performance: Given the constraints, ensure the solution can handle upper limits efficiently.