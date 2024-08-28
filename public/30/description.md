## Encode and Decode Strings

Design an algorithm to encode a list of strings to a single string. The encoded string can then be transferred over a network and decoded back to its original list of strings.

## Examples

### Example 1:
```
Input: ["hello", "world"]
Output: "5#hello5#world"
```

### Example 2:
```
Input: ["", "decode", "string"]
Output: "0#5#decode6#string"
```

## Constraints

- Each string in the list can contain any ASCII character.
- The list of strings may be empty.

## Notes

- The encoding method should encode the length of each string followed by a special character (e.g., '#') and then the string itself.
- The '#' character is chosen arbitrarily and should not appear in any of the original strings. Developers should handle edge cases where strings could potentially contain the chosen delimiter.