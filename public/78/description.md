# Longest Substring Without Repeating Characters

Given the root of a binary tree, write a function to invert the tree and return its root. An inverted tree is one where the left and right children of all nodes are swapped.

## Examples

Example 1:

```
Input:
   1
  / \
 2   3

Output:
   1
  / \
 3   2
```

**Input:** root = `[1, 2, 3]`
**Output:** `[1, 3, 2]`

Example 2:

```
Input:
   4

Output:
   4
```

**Input:** root = `[4]`
**Output:** `[4]`

## Constraints

- Number of nodes: `1 <= n <= 1000`
- Node values: `-1000 <= Node.val <= 1000`

## Notes

- Nodes can have `None` values, simulating missing children.
- The binary tree is represented using list input.