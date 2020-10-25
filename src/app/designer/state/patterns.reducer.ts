import {Action, on, createReducer} from '@ngrx/store';
import { Pattern } from '../../_models/pattern';
import * as patternActions from './patterns.actions';

export interface ReducerPatternState {
  patterns: Pattern[];
  selectedPattern: Pattern;
  loading: boolean;
}

export const initialState: ReducerPatternState = {
  patterns: [{'id': '2','name':'Glider','description':'The glider (or featherweight spaceship) is the smallest, most common, and first-discovered spaceship. It travels diagonally across the Life grid at a speed of c/4. Gliders are important because they are easily produced (for an example see the Gosper glider gun), can be collided with each other to form more complicated objects (see glider synthesis), and can be used to transmit information over long distances.','author':'Richard K. Guy','year':1969,'heat':4,'sizeX':3,'sizeY':3,'pattern':'.O\n..O\nOOO','type':'Spaceship'}],
  selectedPattern: null,
  loading: false
};


const patternReducerInternal = createReducer(
  initialState,
  on(
    patternActions.addPattern,
    patternActions.deletePattern,
    patternActions.loadAllPatterns,
    patternActions.loadSinglePattern,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(patternActions.addPatternFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    items: [...state.patterns, payload]
  })),
  on(patternActions.loadAllPatternsFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    items: [...payload]
  })),
  on(patternActions.loadSinglePatternFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    selectedItem: payload
  })),
  on(patternActions.deletePatternFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    items: [...state.patterns.filter(x => x !== payload)]
  }))
);

export function patternReducer(
  state: ReducerPatternState | undefined,
  action: Action
) {
  return patternReducerInternal(state, action);
}
