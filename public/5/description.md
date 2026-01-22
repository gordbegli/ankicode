# Linked List: Fast and Slow Pointer

Write the template for the fast and slow pointer technique on linked lists.

## When to Use
- Finding the middle of a linked list
- Detecting cycles in a linked list
- Finding the start of a cycle
- Problems involving linked list traversal at different speeds

## Template Structure
- Initialize both `slow` and `fast` to head
- Move `slow` one step, `fast` two steps
- Loop while fast and fast.next exist
