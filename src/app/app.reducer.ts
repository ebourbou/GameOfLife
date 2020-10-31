import { ActionReducerMap } from '@ngrx/store';

import {Pattern} from './shared/model/pattern';
import {PatternsReducer} from './designer/state';

export interface AppState {
  patterns: Pattern[];
}

export const rootReducer: ActionReducerMap<AppState> = {
  patterns: PatternsReducer
};
