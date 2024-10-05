## Valid Parentheses

Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

A string is considered valid if it satisfies the following conditions:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every closing bracket has a corresponding open bracket of the same type.

### Examples

Example 1:
```python
Input: s = "()"
Output: True
```

Example 2:
```python
Input: s = "()[]{}"
Output: True
```

Example 3:
```python
Input: s = "(]"
Output: False
```

Example 4:
```python
Input: s = "([])"
Output: True
```

Example 5:
```python
Input: s = "[(])"
Output: False
```

### Constraints:

* 0 <= s.length <= 10^4
* The string `s` consists of parentheses only '()[]{}'.