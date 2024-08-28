# Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.

## Tree Representation

The tree is represented as a list in level-order traversal, where `None` indicates the absence of a node. For example, the list `[1,2,3,None,5,None,4]` represents the following tree:
```
    1
   / \
  2   3
   \   \
    5   4
```

## Examples

### Example 1
```
Input: root = [1,2,3,None,5,None,4]
Output: [1, 3, 4]
Explanation: The tree looks like this:
    1
   / \
  2   3
   \   \
    5   4
From the right side, you can see the nodes with values 1, 3, and 4.
```

### Example 2
```
Input: root = [1, None, 3]
Output: [1, 3]
Explanation: The tree looks like this:
    1
     \
      3
From the right side, you can see the nodes with values 1 and 3.
```

### Example 3
```
Input: root = []
Output: []
Explanation: The tree is empty, so there are no nodes to see from the right side.
```

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`.

## Approach

Consider using Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse the tree and keep track of the rightmost node at each level.
