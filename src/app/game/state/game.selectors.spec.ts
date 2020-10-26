import * as fromGame from "./game.reducer";
import { selectGameState } from "./game.selectors";

describe("Game Selectors", () => {
  it("should select the feature state", () => {
    const result = selectGameState({
      [fromGame.gameFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
