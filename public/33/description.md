# Longest Consecutive Sequence

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.

Your algorithm must run in O(n) time.

## Examples

### Example 1:
```
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

### Example 2:
```
Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
Explanation: The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]. Its length is 9.
```

## Constraints:
* `0 <= nums.length <= 10^5`
* `-10^9 <= nums[i] <= 10^9`

## Notes:
* The sequence elements must be consecutive, even if the sequence is out of order in the input array.
* Handle edge cases such as an empty array and a single-element array.