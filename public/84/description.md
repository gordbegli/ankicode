## Walls and Gates

You are given a grid `rooms` of size `m x n`, which is initialized with the following values:

- `-1` represents a wall or an obstacle.
- `0` represents a gate.
- `INF` represents an empty room. We use the value $2^{31} - 1 = 2147483647$ to represent `INF`, as you may assume that the distance to a gate is less than $2147483647$.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should remain `INF`.

## Examples

### Example 1:

Input:
```
[[2147483647, -1, 0, 2147483647],
 [2147483647, 2147483647, 2147483647, -1],
 [2147483647, -1, 2147483647, -1],
 [0, -1, 2147483647, 2147483647]]
```

Output:
```
[[3, -1, 0, 1],
 [2, 2, 1, -1],
 [1, -1, 2, -1],
 [0, -1, 3, 4]]
```

## Constraints

- $m == rooms.length$
- $n == rooms[i].length$
- $1 \leq m, n \leq 250$
- Each room can be either a wall (`-1`), a gate (`0`), or an empty room (`2147483647`).