# Combination Sum II

Given a collection of candidate numbers and a target number, find all unique combinations in candidates where the candidate numbers sum to the target value.

Each number in candidates may only be used once in the combination.

**Note**: The solution set must not contain duplicate combinations, and the order of elements in the combination doesn't matter.

### Examples

**Example 1:**
```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
  [1, 1, 6],
  [1, 2, 5],
  [1, 7],
  [2, 6]
]
```

**Example 2:**
```
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
  [1, 2, 2],
  [5]
]
```

### Constraints

* 1 <= candidates.length <= 100
* 1 <= candidates[i] <= 50
* 1 <= target <= 30