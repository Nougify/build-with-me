# Snake: PLAN.md

Written with the student during kickoff and design. Stack: JavaScript + Vitest.

**Done means:** I can open the page, steer the snake with the arrow keys, eat
food to grow, see my score, and the game ends when I hit a wall or myself.

| Level | Goal | Concept |
|-------|------|---------|
| 1 | Start a game: snake of 3 in the middle, heading right, score 0 | objects, arrays |
| 2 | Move the snake one cell per tick | array `unshift` / `pop`, coordinates |
| 3 | Turn with arrow keys, but never straight back into yourself | if-statements |
| 4 | Eat food, grow by one, score +1, new food never on the snake | randomness, loops |
| 5 | Game over on wall or self hit; a finished game stops moving | edge cases |
| 6 | Draw it on a canvas and hook up the keyboard (playtest, no unit tests) | DOM, events |
| 7 | Ship it to GitHub Pages and write the README | deploying |

## State the game remembers (decided by the student)

```
{ width, height, snake: [{x, y}, ...head first], dir: "up"|"down"|"left"|"right",
  food: {x, y}, score, over }
```
