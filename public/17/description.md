# Binary Search: Left-most Insertion Point

Write the template for binary search finding the left-most insertion point (lower bound) with duplicate elements.

## When to Use
- Finding first occurrence of element
- Finding insertion point for sorted order
- Lower bound queries
- Duplicate elements in sorted array

## Template Structure
- Initialize left = 0, right = len(arr)
- Loop while left < right
- Move right = mid when arr[mid] >= target
- Move left = mid + 1 otherwise
