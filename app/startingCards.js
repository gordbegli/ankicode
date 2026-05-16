import { createEmptyCard } from 'ts-fsrs';

const startingCardDefinitions = [
  {
    id: 0,
    title: 'Two Pointers: Opposite Ends',
    pattern: 'twopointer',
    difficultyRating: 'Easy',
    starterCode: `# Two Pointers: Opposite Ends

def fn(arr):
    pass
`,
    solution: `# Two Pointers: Opposite Ends

def fn(arr):
    left = ans = 0
    right = len(arr) - 1

    while left < right:
        # do some logic here with left and right
        if CONDITION:
            left += 1
        else:
            right -= 1

    return ans
`,
  },
  {
    id: 1,
    title: 'Two Pointers: Two Inputs',
    pattern: 'twopointer',
    difficultyRating: 'Easy',
    starterCode: `# Two Pointers: Two Inputs

def fn(arr1, arr2):
    pass
`,
    solution: `# Two Pointers: Two Inputs

def fn(arr1, arr2):
    i = j = ans = 0

    while i < len(arr1) and j < len(arr2):
        # do some logic here
        if CONDITION:
            i += 1
        else:
            j += 1

    while i < len(arr1):
        # do logic
        i += 1

    while j < len(arr2):
        # do logic
        j += 1

    return ans
`,
  },
  {
    id: 2,
    title: 'Sliding Window',
    pattern: 'slidingwindow',
    difficultyRating: 'Easy',
    starterCode: `# Sliding Window

def fn(arr):
    pass
`,
    solution: `# Sliding Window

def fn(arr):
    left = ans = curr = 0

    for right in range(len(arr)):
        # do logic here to add arr[right] to curr

        while WINDOW_CONDITION_BROKEN:
            # remove arr[left] from curr
            left += 1

        # update ans

    return ans
`,
  },
  {
    id: 3,
    title: 'Build a Prefix Sum',
    pattern: 'array',
    difficultyRating: 'Easy',
    starterCode: `# Prefix Sum

def fn(arr):
    pass
`,
    solution: `# Prefix Sum

def fn(arr):
    prefix = [arr[0]]
    for i in range(1, len(arr)):
        prefix.append(prefix[-1] + arr[i])

    return prefix
`,
  },
  {
    id: 4,
    title: 'Efficient String Building',
    pattern: 'array',
    difficultyRating: 'Easy',
    starterCode: `# Efficient String Building

def fn(arr):
    pass
`,
    solution: `# Efficient String Building

# arr is a list of characters
def fn(arr):
    ans = []
    for c in arr:
        ans.append(c)

    return "".join(ans)
`,
  },
  {
    id: 5,
    title: 'Linked List: Fast and Slow Pointer',
    pattern: 'linkedlist',
    difficultyRating: 'Easy',
    starterCode: `# Linked List: Fast and Slow Pointer

def fn(head):
    pass
`,
    solution: `# Linked List: Fast and Slow Pointer

def fn(head):
    slow = head
    fast = head
    ans = 0

    while fast and fast.next:
        # do logic
        slow = slow.next
        fast = fast.next.next

    return ans
`,
  },
  {
    id: 6,
    title: 'Reversing a Linked List',
    pattern: 'linkedlist',
    difficultyRating: 'Easy',
    starterCode: `# Reversing a Linked List

def fn(head):
    pass
`,
    solution: `# Reversing a Linked List

def fn(head):
    curr = head
    prev = None
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node

    return prev
`,
  },
  {
    id: 7,
    title: 'Number of Subarrays with Exact Criteria',
    pattern: 'array',
    difficultyRating: 'Medium',
    starterCode: `# Subarrays with Exact Criteria

def fn(arr, k):
    pass
`,
    solution: `# Subarrays with Exact Criteria

from collections import defaultdict

def fn(arr, k):
    counts = defaultdict(int)
    counts[0] = 1
    ans = curr = 0

    for num in arr:
        # do logic to change curr
        ans += counts[curr - k]
        counts[curr] += 1

    return ans
`,
  },
  {
    id: 8,
    title: 'Monotonic Increasing Stack',
    pattern: 'stack',
    difficultyRating: 'Medium',
    starterCode: `# Monotonic Increasing Stack

def fn(arr):
    pass
`,
    solution: `# Monotonic Increasing Stack

def fn(arr):
    stack = []
    ans = 0

    for num in arr:
        # for monotonic decreasing, just flip the > to <
        while stack and stack[-1] > num:
            # do logic
            stack.pop()
        stack.append(num)

    return ans
`,
  },
  {
    id: 9,
    title: 'Binary Tree: DFS (Recursive)',
    pattern: 'tree',
    difficultyRating: 'Easy',
    starterCode: `# Binary Tree: DFS (Recursive)

def dfs(root):
    pass
`,
    solution: `# Binary Tree: DFS (Recursive)

def dfs(root):
    if not root:
        return

    ans = 0

    # do logic
    dfs(root.left)
    dfs(root.right)
    return ans
`,
  },
  {
    id: 10,
    title: 'Binary Tree: DFS (Iterative)',
    pattern: 'tree',
    difficultyRating: 'Medium',
    starterCode: `# Binary Tree: DFS (Iterative)

def dfs(root):
    pass
`,
    solution: `# Binary Tree: DFS (Iterative)

def dfs(root):
    stack = [root]
    ans = 0

    while stack:
        node = stack.pop()
        # do logic
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    return ans
`,
  },
  {
    id: 11,
    title: 'Binary Tree: BFS',
    pattern: 'tree',
    difficultyRating: 'Medium',
    starterCode: `# Binary Tree: BFS

def fn(root):
    pass
`,
    solution: `# Binary Tree: BFS

from collections import deque

def fn(root):
    queue = deque([root])
    ans = 0

    while queue:
        current_length = len(queue)
        # do logic for current level

        for _ in range(current_length):
            node = queue.popleft()
            # do logic
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return ans
`,
  },
  {
    id: 12,
    title: 'Graph: DFS (Recursive)',
    pattern: 'graph',
    difficultyRating: 'Medium',
    starterCode: `# Graph: DFS (Recursive)

def fn(graph):
    pass
`,
    solution: `# Graph: DFS (Recursive)

def fn(graph):
    def dfs(node):
        ans = 0
        # do some logic
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                ans += dfs(neighbor)

        return ans

    seen = {START_NODE}
    return dfs(START_NODE)
`,
  },
  {
    id: 13,
    title: 'Graph: DFS (Iterative)',
    pattern: 'graph',
    difficultyRating: 'Medium',
    starterCode: `# Graph: DFS (Iterative)

def fn(graph):
    pass
`,
    solution: `# Graph: DFS (Iterative)

def fn(graph):
    stack = [START_NODE]
    seen = {START_NODE}
    ans = 0

    while stack:
        node = stack.pop()
        # do some logic
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                stack.append(neighbor)

    return ans
`,
  },
  {
    id: 14,
    title: 'Graph: BFS',
    pattern: 'graph',
    difficultyRating: 'Medium',
    starterCode: `# Graph: BFS

def fn(graph):
    pass
`,
    solution: `# Graph: BFS

from collections import deque

def fn(graph):
    queue = deque([START_NODE])
    seen = {START_NODE}
    ans = 0

    while queue:
        node = queue.popleft()
        # do some logic
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)

    return ans
`,
  },
  {
    id: 15,
    title: 'Find Top K Elements with Heap',
    pattern: 'heap',
    difficultyRating: 'Medium',
    starterCode: `# Find Top K Elements with Heap

def fn(arr, k):
    pass
`,
    solution: `# Find Top K Elements with Heap

import heapq

def fn(arr, k):
    heap = []
    for num in arr:
        # do some logic to push onto heap according to problem's criteria
        heapq.heappush(heap, (CRITERIA, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for num in heap]
`,
  },
  {
    id: 16,
    title: 'Binary Search',
    pattern: 'binarysearch',
    difficultyRating: 'Easy',
    starterCode: `# Binary Search

def fn(arr, target):
    pass
`,
    solution: `# Binary Search

def fn(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            # do something
            return
        if arr[mid] > target:
            right = mid - 1
        else:
            left = mid + 1

    # left is the insertion point
    return left
`,
  },
  {
    id: 17,
    title: 'Binary Search: Left-most Insertion Point',
    pattern: 'binarysearch',
    difficultyRating: 'Medium',
    starterCode: `# Binary Search: Left-most Insertion Point

def fn(arr, target):
    pass
`,
    solution: `# Binary Search: Left-most Insertion Point

def fn(arr, target):
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] >= target:
            right = mid
        else:
            left = mid + 1

    return left
`,
  },
  {
    id: 18,
    title: 'Binary Search: Right-most Insertion Point',
    pattern: 'binarysearch',
    difficultyRating: 'Medium',
    starterCode: `# Binary Search: Right-most Insertion Point

def fn(arr, target):
    pass
`,
    solution: `# Binary Search: Right-most Insertion Point

def fn(arr, target):
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] > target:
            right = mid
        else:
            left = mid + 1

    return left
`,
  },
  {
    id: 19,
    title: 'Binary Search: Greedy (Minimum)',
    pattern: 'binarysearch',
    difficultyRating: 'Hard',
    starterCode: `# Binary Search: Greedy (Minimum)

def fn(arr):
    pass
`,
    solution: `# Binary Search: Greedy (Minimum)

def fn(arr):
    def check(x):
        # this function is implemented depending on the problem
        return BOOLEAN

    left = MINIMUM_POSSIBLE_ANSWER
    right = MAXIMUM_POSSIBLE_ANSWER
    while left <= right:
        mid = (left + right) // 2
        if check(mid):
            right = mid - 1
        else:
            left = mid + 1

    return left
`,
  },
  {
    id: 20,
    title: 'Binary Search: Greedy (Maximum)',
    pattern: 'binarysearch',
    difficultyRating: 'Hard',
    starterCode: `# Binary Search: Greedy (Maximum)

def fn(arr):
    pass
`,
    solution: `# Binary Search: Greedy (Maximum)

def fn(arr):
    def check(x):
        # this function is implemented depending on the problem
        return BOOLEAN

    left = MINIMUM_POSSIBLE_ANSWER
    right = MAXIMUM_POSSIBLE_ANSWER
    while left <= right:
        mid = (left + right) // 2
        if check(mid):
            left = mid + 1
        else:
            right = mid - 1

    return right
`,
  },
  {
    id: 21,
    title: 'Backtracking',
    pattern: 'backtracking',
    difficultyRating: 'Medium',
    starterCode: `# Backtracking

def backtrack(curr):
    pass
`,
    solution: `# Backtracking

def backtrack(curr, OTHER_ARGUMENTS...):
    if (BASE_CASE):
        # modify the answer
        return

    ans = 0
    for (ITERATE_OVER_INPUT):
        # modify the current state
        ans += backtrack(curr, OTHER_ARGUMENTS...)
        # undo the modification of the current state

    return ans
`,
  },
  {
    id: 22,
    title: 'Dynamic Programming: Top-Down Memoization',
    pattern: '1Ddynamicprogramming',
    difficultyRating: 'Medium',
    starterCode: `# Dynamic Programming: Top-Down

def fn(arr):
    pass
`,
    solution: `# Dynamic Programming: Top-Down

def fn(arr):
    def dp(STATE):
        if BASE_CASE:
            return 0

        if STATE in memo:
            return memo[STATE]

        ans = RECURRENCE_RELATION(STATE)
        memo[STATE] = ans
        return ans

    memo = {}
    return dp(STATE_FOR_WHOLE_INPUT)
`,
  },
  {
    id: 23,
    title: 'Build a Trie',
    pattern: 'trie',
    difficultyRating: 'Medium',
    starterCode: `# Trie

class TrieNode:
    pass
`,
    solution: `# Trie

# note: using a class is only necessary if you want to store data at each node.
# otherwise, you can implement a trie using only hash maps.
class TrieNode:
    def __init__(self):
        # you can store data at nodes if you wish
        self.data = None
        self.children = {}

def fn(words):
    root = TrieNode()
    for word in words:
        curr = root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        # at this point, you have a full word at curr
        # you can perform more logic here to give curr an attribute if you want

    return root
`,
  },
  {
    id: 24,
    title: "Dijkstra's Algorithm",
    pattern: 'advancedgraph',
    difficultyRating: 'Hard',
    starterCode: `# Dijkstra's Algorithm


`,
    solution: `# Dijkstra's Algorithm

from math import inf
from heapq import *

distances = [inf] * n
distances[source] = 0
heap = [(0, source)]

while heap:
    curr_dist, node = heappop(heap)
    if curr_dist > distances[node]:
        continue

    for nei, weight in graph[node]:
        dist = curr_dist + weight
        if dist < distances[nei]:
            distances[nei] = dist
            heappush(heap, (dist, nei))
`,
  },
];

export const startingCards = startingCardDefinitions.map(card => ({
  ...card,
  stage: 'new',
  ...createEmptyCard(),
}));
