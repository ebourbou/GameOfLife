import * as fromGame from "./game.actions";

describe("loadGames", () => {
  it("should return an action", () => {
    expect(fromGame.loadGames().type).toBe("[Game] Load Games");
  });
});
