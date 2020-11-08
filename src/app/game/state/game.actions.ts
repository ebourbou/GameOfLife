import { createAction, props } from '@ngrx/store';
import { Game } from '../model/Game';
import { Controls } from '../model/Controls';
import { GameStatistic } from '../../statistic/game-statistic/GameStatistic';
import { Pattern } from '../../shared/model/pattern';

export const newDefaultGame = createAction('[Game] New Default');
export const newGame = createAction('[Game] New', props<{ controls: Controls }>());
export const newGameFailure = createAction('[Game] New Failure', props<{ error: any }>());
export const newGameSuccess = createAction('[Game] New Success', props<{ game: Game; gameStatistic: GameStatistic; controls: Controls }>());

export const changeSpeed = createAction('[Game] Change Speed', props<{ speed: number }>());
export const changeGenerations = createAction('[Game] Change Generations', props<{ generations: number }>());

export const playGame = createAction('[Game] Play');
export const startGame = createAction('[Game] Start');
export const startGameSuccess = createAction('[Game] Start Success', props<{ gameStartTime: number }>());
export const nextGeneration = createAction('[Game] Next Generation Start', props<{ currentGeneration: number }>());
export const nextGenerationSuccess = createAction(
  '[Game] Next Generation Success',
  props<{ gameStartTime: number; generationStartTime: number; currentGeneration: number }>()
);

export const loadPatterns = createAction('[Game] Load Patterns');
export const error = createAction('[Game] Failure', props<{ errors: string[] }>());
export const loadPatternsSuccess = createAction('[Game] Load Patterns Success', props<{ allPatterns: Pattern[] }>());

export const endGame = createAction('[Game] End');
export const endGameSuccess = createAction('[Game] End Success');
