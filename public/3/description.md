# Build a Prefix Sum

Write the template for building a prefix sum array.

## When to Use
- Range sum queries
- Finding subarray sums efficiently
- Cumulative sum problems
- When you need O(1) range queries after O(n) preprocessing

## Template Structure
- Initialize prefix array with first element
- Iterate through remaining elements
- Each prefix[i] = prefix[i-1] + arr[i]
