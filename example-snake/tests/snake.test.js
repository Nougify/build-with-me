// In a real session the skill writes one level's block at a time.
// This file shows all five so you can see the whole path.
import { describe, it, expect } from "vitest";
import { createGame, step, changeDirection, placeFood } from "../src/snake.js";

const at = (snake) => snake.map(({ x, y }) => `${x},${y}`);

describe("Level 1: start a game", () => {
  it("snake has 3 cells in the middle, head first, facing right", () => {
    const g = createGame(10, 10);
    expect(at(g.snake)).toEqual(["5,5", "4,5", "3,5"]);
    expect(g.dir).toBe("right");
  });
  it("score starts at 0 and the game is not over", () => {
    const g = createGame(10, 10);
    expect(g.score).toBe(0);
    expect(g.over).toBe(false);
  });
  it("food starts on the board and not on the snake", () => {
    const g = createGame(10, 10);
    expect(g.food.x).toBeGreaterThanOrEqual(0);
    expect(g.food.x).toBeLessThan(10);
    expect(g.food.y).toBeGreaterThanOrEqual(0);
    expect(g.food.y).toBeLessThan(10);
    expect(at(g.snake)).not.toContain(`${g.food.x},${g.food.y}`);
  });
});

describe("Level 2: move", () => {
  it("snake moves one cell to the right", () => {
    const g = { ...createGame(10, 10), food: { x: 0, y: 0 } };
    expect(at(step(g).snake)).toEqual(["6,5", "5,5", "4,5"]);
  });
  it("snake moves up (y gets smaller)", () => {
    const g = { ...createGame(10, 10), dir: "up", food: { x: 0, y: 0 } };
    expect(at(step(g).snake)[0]).toBe("5,4");
  });
  it("length stays the same when not eating", () => {
    const g = { ...createGame(10, 10), food: { x: 0, y: 0 } };
    expect(step(step(g)).snake).toHaveLength(3);
  });
});

describe("Level 3: turn", () => {
  it("can turn up while moving right", () => {
    expect(changeDirection(createGame(10, 10), "up").dir).toBe("up");
  });
  it("cannot reverse straight into itself", () => {
    expect(changeDirection(createGame(10, 10), "left").dir).toBe("right");
  });
});

describe("Level 4: eat and grow", () => {
  it("eating food grows the snake by one and adds 1 to score", () => {
    const g = { ...createGame(10, 10), food: { x: 6, y: 5 } };
    const next = step(g, () => 0);
    expect(next.snake).toHaveLength(4);
    expect(next.score).toBe(1);
  });
  it("new food never lands on the snake", () => {
    const g = createGame(3, 1); // 3x1 board, snake on 2 cells, only (2,0) is free
    const state = { ...g, snake: [{ x: 1, y: 0 }, { x: 0, y: 0 }] };
    for (let i = 0; i < 20; i++) {
      expect(placeFood(state, () => i / 20)).toEqual({ x: 2, y: 0 });
    }
  });
});

describe("Level 5: game over", () => {
  it("hitting a wall ends the game", () => {
    const g = { ...createGame(10, 10), snake: [{ x: 9, y: 5 }, { x: 8, y: 5 }, { x: 7, y: 5 }], food: { x: 0, y: 0 } };
    expect(step(g).over).toBe(true);
  });
  it("hitting your own body ends the game", () => {
    const snake = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }];
    const g = { ...createGame(10, 10), snake, dir: "down", food: { x: 0, y: 0 } };
    expect(step(g).over).toBe(true);
  });
  it("a finished game does not move", () => {
    const g = { ...createGame(10, 10), over: true };
    expect(step(g).snake).toEqual(g.snake);
  });
});
