# Binary Search: Right-most Insertion Point

Write the template for binary search finding the right-most insertion point (upper bound) with duplicate elements.

## When to Use
- Finding last occurrence of element
- Finding position after all equal elements
- Upper bound queries
- Duplicate elements in sorted array

## Template Structure
- Initialize left = 0, right = len(arr)
- Loop while left < right
- Move right = mid when arr[mid] > target
- Move left = mid + 1 otherwise
