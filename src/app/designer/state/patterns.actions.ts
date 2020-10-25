import {Action, createAction, props} from '@ngrx/store';
import { Pattern } from '../../_models/pattern';

export const LOAD_ALL_PATTERNS = '[Patterns] load all';
export const LOAD_SINGLE_PATTERN = '[Patterns] load';
export const DELETE_PATTERN = '[Patterns] delete';
export const DELETE_PATTERN_SUCCESS = '[Patterns] delete success';
export const UPDATE_PATTERN = '[Patterns] update';
export const UPDATE_PATTERN_SUCCESS = '[Patterns] update success';
export const POPULATE_PATTERNS = '[Patterns] populate';
export const ADD_PATTERN    = '[Patterns] add';
export const ADD_PATTERN_SUCCESS = '[Patterns] add success';

export const loadAllPatterns = createAction('[Pattern] Load Patterns');

export const loadAllPatternsFinished = createAction(
  '[Patterns] Load Patterns Finished',
  props<{ payload: Pattern[] }>()
);

export const loadSinglePattern = createAction(
  '[Pattern] Load Single Pattern',
  props<{ payload: string }>()
);

export const loadSinglePatternFinished = createAction(
  '[Pattern] Load Single Pattern Finished',
  props<{ payload: Pattern }>()
);

export const addPattern = createAction(
  '[Pattern] Add Pattern',
  props<{ payload: Pattern }>()
);

export const addPatternFinished = createAction(
  '[Pattern] Add Pattern Finished',
  props<{ payload: Pattern }>()
);

export const deletePattern = createAction(
  '[Pattern] DeletePattern',
  props<{ payload: Pattern }>()
);

export const deletePatternFinished = createAction(
  '[Pattern] DeletePattern Finished',
  props<{ payload: Pattern }>()
);

