# 3Sum

Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.

### Examples

**Example 1:**

```
Input: nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
Explanation: The distinct triplets are [-1, 0, 1] and [-1, -1, 2].
```

**Example 2:**

```
Input: nums = [0, 1, 1]
Output: []
Explanation: There are no triplets that sum up to 0.
```

**Example 3:**

```
Input: nums = [0, 0, 0]
Output: [[0, 0, 0]]
Explanation: The only possible triplet sums up to 0.
```

### Constraints:

* `3 <= nums.length <= 3000`
* `-10^5 <= nums[i] <= 10^5`