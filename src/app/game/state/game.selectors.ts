import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import * as fromGame from "./game.reducer";
import { GameState } from "./game.reducer";
import { Controls } from "../model/Controls";

export const selectGameState = createFeatureSelector<fromGame.GameState>(fromGame.gameFeatureKey);

export const selectGame = createSelector(selectGameState, (state: GameState) => state.game);

export const selectControls = createSelector(selectGameState, (state: GameState) => state.controls);

export const selectGenerationStatistic = createSelector(
  selectGameState,
  (state: GameState) => state.generationStatistic
);

export const selectGameStatistic = createSelector(selectGameState, (state: GameState) => state.gameStatistic);
