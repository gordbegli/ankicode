# Invert Binary Tree

Given the root of a binary tree, invert the tree, and return its root. This operation is also known as "mirroring" the tree. Inverting a binary tree involves swapping the left and right children of all nodes in the tree.

## Examples

Example 1:
```
Input:
     4
   /   \
  2     7
 / \   / \
1   3 6   9

Output:
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

**Input:** root = `[4,2,7,1,3,6,9]`  
**Output:** `[4,7,2,9,6,3,1]`  

Example 2:
```
Input:
  2
 / \
1   3

Output:
  2
 / \
3   1
```

**Input:** root = `[2,1,3]`  
**Output:** `[2,3,1]`  

## Constraints  
- Number of nodes: `[0 <= n <= 100]`   
- Node values: `[-100 <= Node.val <= 100]`