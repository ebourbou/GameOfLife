import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {patternReducer, ReducerPatternState} from './patterns.reducer';

export const featureStateName = 'patternFeature';

export interface PatternState {
  pattern: ReducerPatternState;
}

export const patternReducers: ActionReducerMap<PatternState> = {
  pattern: patternReducer
};

export const getPatternFeatureState = createFeatureSelector<PatternState>(
  featureStateName
);

export const getSelectedPattern = createSelector(
  getPatternFeatureState,
  (state: PatternState) => state.pattern.selectedPattern
);

export const getAllPatterns = createSelector(
  getPatternFeatureState,
  (state: PatternState) => state.pattern.patterns
);


