# /build-with-me

A Claude Skill that helps students build their own app without letting Claude
write it for them.

Claude helps design the plan and writes the tests. The student writes every
line of app code. The app is split into levels, and each level's tests have to
pass before the next one unlocks, like LeetCode, but it works towards building 
your own project. When the last level passes, the app is finished and the student 
wrote all of it.

## Why

When a student or beginner vibe codes, AI writes the app and the teen copies it. That gets
something shipped, but the student can't debug it or explain it afterward.
This skill keeps the AI for the parts that help learning (planning, tests,
hints) and leaves the coding to the student.

## How a session goes

1. **Kickoff.** Claude asks what they want to build and what "done" looks like,
   then picks a stack (JS + Vitest for web games, Python + pytest, or whatever
   the project already uses).
2. **Design together.** Claude asks questions so the student makes the
   decisions, then writes `PLAN.md` with 4-8 levels. Each level teaches one
   concept.
3. **Each level.** Claude writes that level's tests and empty stubs. The
   student codes until everything turns green.
4. **Stuck?** Hints get more specific each time: a question, then where to
   look, then plain-English pseudocode. Never real code. Tests are locked so
   students can't edit them to pass.
5. **Level cleared.** Claude runs every test, gives one compliment and one
   suggestion, and logs progress in `PROGRESS.md` (level, hints used, what
   they learned). TAs can scan that file to see who is stuck.
6. **Ship it.** Deploy to GitHub Pages or Vercel, and the student writes the
   README.

## Try it

```bash
# use it in any project folder
cp -r .claude/skills/build-with-me ~/.claude/skills/
claude
> /build-with-me
```

## Example: Snake

`example-snake/` shows what a student starts with: the `PLAN.md` from the
design step, empty stubs in `src/snake.js`, and 13 tests across 5 levels.
In a real session the tests come one level at a time.

```bash
cd example-snake && npm install && npm test   # 13 red tests, ready to start
```
