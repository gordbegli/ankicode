# Same Tree

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

## Examples

Example 1:
```
Input: p = [1,2,3], q = [1,2,3]
Output: true

Binary Trees:

    1       1
   / \     / \
  2   3   2   3
```

Example 2:
```
Input: p = [1,2], q = [1,null,2]
Output: false

Binary Trees:

    1       1
   /         \
  2           2
```

Example 3:
```
Input: p = [1,2,1], q = [1,1,2]
Output: false

Binary Trees:

    1       1
   / \     / \
  2   1   1   2
```

## Constraints

* The number of nodes in both trees is in the range [0, 100].
* -10⁴ ≤ Node.val ≤ 10⁴.

Nodes can have `None` values, simulating missing children. The binary trees are represented using list input: for example, `[1,2,3]` represents a tree with root `1`, left child `2`, and right child `3`.