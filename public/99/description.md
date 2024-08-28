## Min Cost to Connect All Points

You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.

The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the Manhattan distance between them: `|xi - xj| + |yi - yj|`, where `|val|` denotes the absolute value of `val`.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

### Examples

#### Example 1:

```
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
10 |     *
9  |
8  |
7  |
6  |
5  |
4  |
3  |
2  |  *     *
1  |
0  |*           *
   +---------------
   0 1 2 3 4 5 6 7
Output: 20
```

#### Example 2:

```
Input: points = [[3,12],[-2,5],[-4,1]]
12 |      *
11 |
10 |
9  |
8  |
7  |
6  |
5  |   *
4  |
3  |
2  |
1  |*
0  |
-1 |
-2 |
-3 |
-4 |
   +---------------
  -4-3-2-1 0 1 2 3
Output: 18
```

### Constraints:

* `1 <= points.length <= 1000`
* `-10^6 <= xi, yi <= 10^6`
* All pairs `(xi, yi)` are distinct.