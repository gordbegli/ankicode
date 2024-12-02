# AnkiCode
AnkiCode is a pattern focused spaced repetition coding platform with an LLM baked in. Thank you to [ishiko732](https://github.com/ishiko732) for creating [`ts-fsrs`](https://github.com/open-spaced-repetition/ts-fsrs)!

## Automatic Rating
Ankicode will rate the [difficulty](https://docs.ankiweb.net/studying.html#answer-buttons) of a card based on the following criteria.

| Rating | Criteria |
|--------|---------|
| Again  | Failed Tests Once |
| Again  | Used LLM Once |
| Good   | Passed First Try |

## Keyboard Shortcuts
So you don't have to use your mouse.

| Shortcut | Action |
|----------|--------|
| Cmd + ' | Run Tests |
| Cmd + \ | Next Problem |
| Cmd + H | Enlarge Editor |
| Cmd + L | Enlarge Menu |
| Cmd + Shift + O | Focus Chat |
| Cmd + Shift + P | Focus Problem |
| Cmd + Shift + I | Focus Editor |
| Cmd + J | Scroll Menu Down |
| Cmd + K | Scroll Menu Up |

## New Problem Schedule
AnkiCode will introduce 1 new card every 24 hours.