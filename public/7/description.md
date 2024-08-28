# Binary Tree Level Order Traversal

Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

## Representation

The binary tree is represented as a list, where each element corresponds to a node's value, and `None` signifies the absence of a node (i.e., a missing child).

## Examples

Example 1:

```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: [[3],[9,20],[15,7]]
```

```
**Input:** root = [3,9,20,None,None,15,7]
**Output:** [[3],[9,20],[15,7]]
```

Example 2:
```
Input:
    1

Output: [[1]]
```

```
**Input:** root = [1]
**Output:** [[1]]
```

Example 3:
```
Input:
Output: []
```

```
**Input:** root = []
**Output:** []
```

## Constraints

* The number of nodes in the tree is in the range [0, 2000].
* -1000 <= Node.val <= 1000

## Edge Cases
* Tree with varying depth and structure
* Nodes can be `None`, simulating missing children