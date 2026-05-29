---

When there is one card left and I answer it. 
And i get it correct.
I see the same card again.
But when I reload the page.
I need the done message, instead of having to answer the question.

---

consider adding these

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
```#
