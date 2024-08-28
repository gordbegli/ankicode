# Kth Smallest Element in a BST

Given the root of a binary search tree (BST) and an integer `k`, return the `k`th smallest value (1-indexed) among all the values of the nodes in the tree.

## Examples

Example 1:
```
    3
   / \
  1   4
   \
    2
```
**Input:** root = `[3,1,4,null,2]`, k = 1  
**Output:** 1  

Example 2:
```
        5
       / \
      3   6
     / \
    2   4
   /
  1
```
**Input:** root = `[5,3,6,2,4,null,null,1]`, k = 3  
**Output:** 3  

## Constraints

* The number of nodes in the tree is `n`.
* `1 <= k <= n <= 10^4`
* `0 <= Node.val <= 10^4`

## Follow up
If the BST is frequently modified (i.e., insertions and deletions are common) and you need to find the `k`th smallest value often, how would you optimize?