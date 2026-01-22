# Number of Subarrays with Exact Criteria

Write the template for counting subarrays that fit exact criteria using prefix sums and hash maps.

## When to Use
- Counting subarrays with exact sum k
- Finding subarrays where some property equals a target
- Problems involving cumulative values and exact matches

## Template Structure
- Use a hash map to store prefix counts
- Initialize counts[0] = 1 (empty prefix)
- Track running sum with `curr`
- Count matches using curr - k
