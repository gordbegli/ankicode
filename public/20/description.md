# Binary Search: Greedy (Maximum)

Write the template for binary search on answer space to find a maximum value that satisfies a condition.

## When to Use
- Finding maximum value that works
- Optimization problems with monotonic feasibility
- "Maximize the minimum" problems
- When feasibility is monotonic (if x works, x-1 works)

## Template Structure
- Define check(x) function for feasibility
- Search between MINIMUM and MAXIMUM possible answers
- If check(mid) is True, search higher (left = mid + 1)
- Return right as the maximum valid answer
