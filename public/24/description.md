# Dijkstra's Algorithm

Write the template for Dijkstra's shortest path algorithm.

## When to Use
- Shortest path in weighted graph (non-negative weights)
- Single source shortest paths
- Finding minimum cost paths

## Template Structure
- Initialize distances array with infinity
- Set source distance to 0
- Use min-heap with (distance, node) pairs
- Process nodes by increasing distance
- Update distances for neighbors
