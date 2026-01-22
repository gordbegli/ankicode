# Sliding Window

Write the template for the sliding window technique.

## When to Use
- Finding subarrays/substrings that satisfy a condition
- Maximum/minimum sum of k consecutive elements
- Longest substring with certain properties
- Problems with contiguous sequences

## Template Structure
- Use `left` and `right` pointers to define window
- Expand window by moving `right`
- Shrink window by moving `left` when condition breaks
- Track current state with `curr` variable
