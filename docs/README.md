# AnkiCode  

AnkiCode blends [Anki](https://apps.ankiweb.net/), a code editor, and an [llm judge](https://github.com/gordbegli/ankicode/blob/main/app/api/grade/route.js).
You can use it to memorize python. It comes stock with cards for the templates from [this](https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms) dsa course.

### Example Flash Card

#### Front
```py
# Trie

class TrieNode():
```

#### Back
```py
# Trie
class TrieNode:
    def __init__(self):
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
    return root
```