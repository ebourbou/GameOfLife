import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';
import { GameState } from './game.reducer';

export const selectGameState = createFeatureSelector<fromGame.GameState>(fromGame.gameFeatureKey);

export const selectGame = createSelector(selectGameState, (state: GameState) => state.game);

export const selectControls = createSelector(selectGameState, (state: GameState) => state.controls);

export const selectGenerationStatistic = createSelector(selectGameState, (state: GameState) => state.generationStatistic);

export const selectGameStatistic = createSelector(selectGameState, (state: GameState) => state.gameStatistic);

export const selectAllPatterns = createSelector(selectGameState, (state: GameState) => state.allPatterns);

export const selectPatternSelected = createSelector(selectGameState, (state: GameState) => state.patternSelected);
