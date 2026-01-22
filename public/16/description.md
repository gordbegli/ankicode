# Binary Search

Write the template for standard binary search.

## When to Use
- Searching in sorted array
- Finding exact match
- O(log n) search requirement

## Template Structure
- Initialize left = 0, right = len(arr) - 1
- Loop while left <= right
- Calculate mid = (left + right) // 2
- Adjust boundaries based on comparison
- Return position or -1
