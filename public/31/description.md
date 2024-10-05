## Product of Array Except Self

Given an integer array `nums`, return an integer array `answer` where `answer[i]` contains the product of all the elements from `nums` except `nums[i]`.

### Requirements

1. Your algorithm should run in O(n) time complexity.
2. You are not allowed to use the division operation.
3. Ensure that the product of any prefix or suffix of `nums` fits in a 32-bit integer.

### Example

**Example 1:**
```
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
Explanation:
- `answer[0]` = 2 * 3 * 4 = 24
- `answer[1]` = 1 * 3 * 4 = 12
- `answer[2]` = 1 * 2 * 4 = 8
- `answer[3]` = 1 * 2 * 3 = 6
```

**Example 2:**
```
Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
Explanation:
- `answer[0]` = 1 * 0 * -3 * 3 = 0
- `answer[1]` = -1 * 0 * -3 * 3 = 0
- `answer[2]` = -1 * 1 * -3 * 3 = 9
- `answer[3]` = -1 * 1 * 0 * 3 = 0
- `answer[4]` = -1 * 1 * 0 * -3 = 0
```

### Constraints:

- 2 <= `nums.length` <= 10^5
- -30 <= `nums[i]` <= 30
- The product of any prefix or suffix of `nums` fits in a 32-bit integer.

### Follow-up:
Can you solve the problem with O(1) extra space complexity? (Note: The output array does not count as extra space for this purpose.)