## Car Fleet

There are `n` cars at different positions on a straight road, all heading towards a target destination at mile `target`.

You are given two integer arrays, `position` and `speed`, both of length `n`, where `position[i]` represents the starting mile of the `i`-th car and `speed[i]` represents the speed of the `i`-th car in miles per hour.

A car cannot pass another car but can catch up and then drive at the speed of the slower car. A car fleet is defined as one or more cars driving together at the same speed. The speed of a car fleet is the minimum speed of any car in the fleet.

If a car catches up to a car fleet exactly at the target, it is considered as part of that fleet.

Return the number of car fleets that will arrive at the destination.

### Examples

#### Example 1:

```
Input: target = 12, position = [10, 8, 0, 5, 3], speed = [2, 4, 1, 1, 3]
Output: 3

Explanation:
- The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at mile 12. The fleet forms at the target.
- The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
- The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at mile 6. They travel together at speed 1 until they reach the target.
```

#### Example 2:

```
Input: target = 10, position = [3], speed = [3]
Output: 1

Explanation:
There is only one car, hence there is only one fleet.
```

#### Example 3:

```
Input: target = 100, position = [0, 2, 4], speed = [4, 2, 1]
Output: 1

Explanation:
- The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at mile 4. The car starting at 4 (speed 1) travels to mile 5.
- Then, the fleet at mile 4 (speed 2) and the car at mile 5 (speed 1) become one fleet, meeting each other at mile 6. The fleet moves together at speed 1 until they reach the target.
```

### Constraints:

- `n == position.length == speed.length`
- `1 <= n <= 10^5`
- `0 < target <= 10^6`
- `0 <= position[i] < target`
- All values of `position` are unique.
- `0 < speed[i] <= 10^6`