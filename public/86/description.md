## Binary Tree Traversals

Given the following binary tree:

```
    1
   / \
  2   3
 / \
4   5
```

Write functions to perform the following traversals:

1. **Breadth-First Traversal**: Traverse the tree level by level from left to right.
    - Example: `1 -> 2 -> 3 -> 4 -> 5`

2. **Depth-First Traversals**:
    - Preorder: Traverse the root, then the left subtree, then the right subtree.
      - Example: `1 -> 2 -> 4 -> 5 -> 3`
    - Inorder: Traverse the left subtree, then the root, then the right subtree.
      - Example: `4 -> 2 -> 5 -> 1 -> 3`
    - Postorder: Traverse the left subtree, then the right subtree, then the root.
      - Example: `4 -> 5 -> 2 -> 3 -> 1`
    
Your task is to implement these traversal methods. The input will be the root node of a binary tree, and the output should be a list of values representing the traversal order.