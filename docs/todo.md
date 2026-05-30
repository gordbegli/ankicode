> maybe these should be defaults?

```
#graph from array of edges
from collections import defaultdict

def build_graph(edges):
    graph = defaultdict(list)
    for x, y in edges:
        graph[x].append(y)
        graph[y].append(x)
        # uncomment the above line if the graph is undirected
    
    return graph
```

```
#convert directed graph to undirected graph
def dfs(node, parent):
	if not node:
		return
	
	node.parent = parent
	dfs(node.left, node)
	dfs(node.right, node)
	
dfs(root, None)
```

---

- [ ] The naming in the app should be updated to use anki idioms like "card" "front" "back" etc.
- [ ] Clean up the vibe coded slop qol stuff in the app logic.
- [ ] Deliniate the vibe coded components.
- [ ] Make `page.js` more readable.
- [ ] Pretty sure `pattern` is not needed. Rm from `defaultDeck.js`.
- [ ] Do I really need `title` in `defaultDeck.js`?
- [ ] Update `route.js` to use some sort of JSON enforcement instead of the jank I have in there. 