# Number of Connected Components in an Undirected Graph

Given an undirected graph, you need to count the number of connected components in it.

## Examples

### Example 1:

```
Input: n = 5, edges = [[0, 1], [1, 2], [3, 4]]

Output: 2

Explanation: The graph has two connected components:
Component 1: 0 - 1 - 2
Component 2: 3 - 4
```

### Example 2:

```
Input: n = 6, edges = [[0, 1], [1, 2], [2, 3], [3, 4]]

Output: 1

Explanation: The graph has one connected component:
Component 1: 0 - 1 - 2 - 3 - 4
```

**Input:** 
- `n` (number of nodes): integer
- `edges` (adjacency list representation of graph edges): list of list of integers

**Output:** integer (number of connected components)

## Constraints
- The number of nodes `n` will be between `1` and `2000`.
- The number of edges will be between `0` and `5000`.
- The node values will be between `0` and `n-1`.

## Solution
To solve this problem, we can use Depth-First Search (DFS) or Breadth-First Search (BFS) to explore the graph and count the components. Keep track of visited nodes, and for each unvisited node, perform a DFS/BFS to mark all nodes in its component as visited.