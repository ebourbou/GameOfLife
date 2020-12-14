import { createAction, props } from '@ngrx/store';
import { Game } from '../model/Game';
import { Controls } from '../model/Controls';
import { Pattern } from '../../shared/model/pattern';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { StepperStep } from '../stepper/StepperStep';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { Score } from '../../statistic/service/score';

export const newDefaultGame = createAction('[Game] New Game Default');
export const newGame = createAction('[Game] New Game', props<{ controls: Controls }>());
export const newGameSuccess = createAction('[Game] New Game Success', props<{ game: Game; controls: Controls }>());

export const changeSpeed = createAction('[Game] Change Speed', props<{ speed: number }>());
export const changeGenerations = createAction('[Game] Change Generations', props<{ generations: number }>());

export const startGame = createAction('[Game] Start Game');
export const startGameSuccess = createAction('[Game] Start Game Success');
export const nextGeneration = createAction('[Game] Next Generation Start', props<{ currentGeneration: number }>());
export const nextGenerationSuccess = createAction('[Game] Next Generation Success', props<{ currentGeneration: number }>());

export const startAnalysis = createAction('[Game] Start Analysis', props<{ game: Game; generationStatistics: GenerationStatistic[] }>());
export const startAnalysisSuccess = createAction('[Game] Start Analysis Success', props<{ score: Score }>());

export const patternSelected = createAction('[Game] Pattern Selected', props<{ selectedPattern: Pattern }>());
export const applyPattern = createAction('[Game] Pattern Apply', props<{ row: number; column: number }>());

export const loadPatterns = createAction('[Game] Load Patterns');
export const errorAction = createAction('[Game] Failure', props<{ errors: string[] }>());
export const loadPatternsSuccess = createAction('[Game] Load Patterns Success', props<{ allPatterns: Pattern[] }>());

export const loadRuleSets = createAction('[Game] Load RuleSets');
export const loadRuleSetsSuccess = createAction('[Game] Load RuleSets Success', props<{ allRuleSets: RuleSet[] }>());
export const applyRuleSet = createAction('[Game] RuleSet Apply', props<{ ruleSet: RuleSet }>());

export const togglePause = createAction('[Game] Pause Toggled');

export const endGame = createAction('[Game] End');
export const endGameSuccess = createAction('[Game] End Success');

export const resetCells = createAction('[Game] Reset Cells');
export const randomCells = createAction('[Game] Random Cells');
export const invertCells = createAction('[Game] Invert Cells');
export const stepChanged = createAction('[Game] Step Changed', props<{ step: StepperStep }>());
export const toggleMaximize = createAction('[Game] Toggle Maximize Board');

export const addGame = createAction('[Game] Add Game', props<{ game: Game }>());
export const applyGame = createAction('[Game] Apply Game', props<{ id: string }>());
export const applyGameSuccess = createAction('[Game] Apply Game Success', props<{ game: Game }>());

export const saveGameSuccess = createAction('[Game] Save Game Success', props<{ id: string }>());
