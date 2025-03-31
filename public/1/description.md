## Maximum Depth of Binary Tree

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Examples

#### Example 1

```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: 3
```

**Explanation:** The maximum depth is 3, which is the depth of the path [3,9] or [3,20,15] or [3,20,7].

**Input:** root = `[3,9,20,null,null,15,7]`
**Output:** `3`

#### Example 2

```
Input:
    1
     \
      2

Output: 2
```

**Explanation:** The maximum depth is 2, which is the depth of the path [1,2].

**Input:** root = `[1,null,2]`
**Output:** `2`

#### Example 3

```
Input:
    []

Output: 0
```

**Explanation:** The maximum depth of an empty tree is 0.

**Input:** root = `[]`
**Output:** `0`

### Constraints
- Number of nodes in the tree: `0 <= n <= 10^4`
- Node values: `-100 <= Node.val <= 100`

### Note
Binary trees are represented as arrays where `root = [3,9,20,null,null,15,7]` means the root is 3, and its left child is 9 and right child is 20. Leaf nodes have both children as `null` in such representations.

### Edge Cases
- Empty tree (null root)
- Single node tree
- Completely unbalanced tree (essentially a linked list)
- Balanced tree with all nodes having either 0 or 2 children