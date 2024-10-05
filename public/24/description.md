# Partition Equal Subset Sum

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or `false` otherwise.

## Examples

Example 1:
```python
Input: nums = [1, 5, 11, 5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

Example 2:
```python
Input: nums = [1, 2, 3, 5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

## Constraints
* `1 <= nums.length <= 200`
* `1 <= nums[i] <= 100`