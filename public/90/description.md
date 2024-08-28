## Graph Valid Tree

Given `n` nodes labeled from `0` to `n-1` and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

### Definition of a Tree
1. The graph must be connected, meaning there is a path between any two nodes.
2. The graph must be acyclic, meaning it does not contain any cycles.

## Examples

### Example 1:
```python
Input: n = 5, edges = [[0,1], [0,2], [0,3], [0,4]]
Output: true
```

### Example 2:
```python
Input: n = 5, edges = [[0,1], [1,2], [2,3], [1,3], [1,4]]
Output: false
```

### Example 3:
```python
Input: n = 1, edges = []
Output: true
```

## Constraints
- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`
- `edges[i].length == 2`
- `0 <= edges[i][j] < n`
- There are no self-loops or repeated edges.

## Notes
- The function should return a boolean value indicating whether the given edges form a valid tree.
- An empty graph (no edges) with one node is considered a valid tree.