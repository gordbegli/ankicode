# Valid Palindrome

A string is considered a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `True` if it is a palindrome, or `False` otherwise.

## Examples

**Example 1:**

```
Input: s = "A man, a plan, a canal: Panama"
Output: True
Explanation: After processing, "amanaplanacanalpanama" reads the same forward and backward.
```

**Example 2:**

```
Input: s = "race a car"
Output: False
Explanation: After processing, "raceacar" does not read the same forward and backward.
```

**Example 3:**

```
Input: s = " "
Output: True
Explanation: After removing non-alphanumeric characters, the string becomes an empty string "" which is a palindrome by definition.
```

## Constraints

* 1 <= s.length <= 2 * 10^5
* `s` consists only of printable ASCII characters.