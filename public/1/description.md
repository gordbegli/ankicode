## Sum of Left Leaves

Given the root of a binary tree, return the sum of all left leaves. A leaf is a node with no children. A left leaf is a leaf that is the left child of its parent.

### Examples

#### Example 1

```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: 24
```

**Explanation:** The left leaves are 9 and 15. Sum = 9 + 15 = 24.

**Input:** root = `[3,9,20,null,null,15,7]`
**Output:** `24`

#### Example 2

```
Input:
    1
     \
      2

Output: 0
```

**Explanation:** There are no left leaves.

**Input:** root = `[1,null,2]`
**Output:** `0`

### Constraints
- Number of nodes in the tree: `1 <= n <= 1000`
- Node values: `-1000 <= Node.val <= 1000`

### Note
Binary trees are often given as array representations where `root = [3,9,20,null,null,15,7]` means the root is 3, and its left child is 9 and right child is 20. Leaf nodes have both children as `null` in such representations.

### Edge Cases
- Single node tree where the root does not have any left leaves.
- All nodes have either left or right children but the leaves are not left leaves.
- Trees that have varying depths and structures.