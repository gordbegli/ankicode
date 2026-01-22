# Binary Search: Greedy (Minimum)

Write the template for binary search on answer space to find a minimum value that satisfies a condition.

## When to Use
- Finding minimum value that works
- Optimization problems with monotonic feasibility
- "Minimize the maximum" problems
- When feasibility is monotonic (if x works, x+1 works)

## Template Structure
- Define check(x) function for feasibility
- Search between MINIMUM and MAXIMUM possible answers
- If check(mid) is True, search lower (right = mid - 1)
- Return left as the minimum valid answer
