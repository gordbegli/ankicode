# Word Search

Given an `m x n` grid of characters `board` and a string `word`, return `True` if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

## Examples

### Example 1:

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: True
```

### Example 2:

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: True
```

### Example 3:

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: False
```

## Constraints

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consist of only lowercase and uppercase English letters.

## Follow-up

Could you use search pruning to make your solution faster with a larger board?

## Edge Cases

- A word that is longer than the total number of cells in the grid.
- A word that shares letters with many parts of the grid but does not form a valid path.
- The same letter repeated in the word and grid causing potential confusion in path tracing.