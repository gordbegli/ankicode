# Remove Nth Node From End of List

Given the head of a singly linked list, remove the nth node from the end of the list and return its head.

## Examples

### Example 1:

```python
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

### Example 2:

```python
Input: head = [1], n = 1
Output: []
```

### Example 3:

```python
Input: head = [1,2], n = 1
Output: [1]
```

## Constraints:

- The number of nodes in the list, denoted as `sz`, ranges from 1 to 30.
- Each node value is an integer between 0 and 100.
- `1 <= n <= sz`

## Follow-Up:

Could you solve this problem in one pass?