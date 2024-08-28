## Generate Parentheses

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

A combination is considered well-formed if each open parenthesis has a corresponding close parenthesis and they are correctly nested. The approach uses backtracking to generate these combinations by adding either an open or close parenthesis at each step, ensuring to maintain the balance between them.

## Examples

Example 1:
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

Example 2:
```
Input: n = 1
Output: ["()"]
```

## Constraints
* `1 <= n <= 8`

## Solution
The function should generate all valid combinations of parentheses. The approach uses backtracking to ensure well-formed combinations are created by adding open and close parentheses while maintaining the balance.

Time Complexity: O(4^n/sqrt(n)), based on the number of combinations of balanced parentheses.

Space Complexity: O(n) for the recursion stack space.