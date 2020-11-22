import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';
import { Game } from '../model/Game';
import { GenerationStatistic } from '../../statistic/game-statistic/GenerationStatistic';
import { Controls } from '../model/Controls';
import { GameStatistic } from '../../statistic/game-statistic/GameStatistic';
import { GameUtils } from '../../shared/service/GameUtils';
import { Board } from '../../shared/model/Board';
import { Pattern } from '../../shared/model/pattern';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { StepperStep } from '../stepper/StepperStep';

export const gameFeatureKey = 'game';

export interface GameState {
  game: Game;
  allPatterns: Pattern[];
  patternSelected: Pattern;
  allRuleSets: RuleSet[];
  ruleSetSelected: RuleSet;
  generationStatistic: GenerationStatistic;
  gameStatistic: GameStatistic;
  loading: boolean;
  controls: Controls;
  running: boolean;
  paused: boolean;
  editable: boolean;
  masked: boolean;
}

export const initialState: GameState = {
  game: null,
  allPatterns: [],
  patternSelected: null,
  allRuleSets: [],
  ruleSetSelected: null,
  generationStatistic: null,
  gameStatistic: null,
  loading: false,
  controls: null,
  running: false,
  paused: false,
  editable: false,
  masked: false,
};

export const gameActionReducer = createReducer(
  initialState,
  on(GameActions.newDefaultGame, GameActions.newGame, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(GameActions.newGameSuccess, (state, action) => {
    return {
      ...state,
      game: action.game,
      gameStatistic: GameUtils.gameStatisticOf(action.game, 0, 0),
      controls: action.controls,
      loading: false,
    };
  }),

  on(GameActions.loadPatternsSuccess, (state, action) => {
    return {
      ...state,
      allPatterns: action.allPatterns,
    };
  }),

  on(GameActions.loadRuleSetsSuccess, (state, action) => {
    return {
      ...state,
      allRuleSets: action.allRuleSets,
    };
  }),

  on(GameActions.newGameFailure, (state) => state),
  on(GameActions.changeSpeed, (state, action) => {
    const newControls = { ...state.controls };
    newControls.speed = action.speed;
    return {
      ...state,
      controls: newControls,
    };
  }),
  on(GameActions.changeGenerations, (state, action) => {
    const newControls = { ...state.controls };
    newControls.generations = action.generations;
    return {
      ...state,
      controls: newControls,
    };
  }),
  on(GameActions.startGameSuccess, (state, action) => {
    const newState = { ...state };
    newState.gameStatistic = GameUtils.gameStatisticOf(newState.game, action.gameStartTime, Date.now());
    newState.loading = false;
    newState.running = true;
    return newState;
  }),
  on(GameActions.nextGeneration, (state) => {
    const newGame = deepCopy(state.game);
    newGame.nextGeneration();
    return { ...state, game: newGame };
  }),
  on(GameActions.nextGenerationSuccess, (state, action) => {
    const newState = { ...state };
    newState.generationStatistic = GameUtils.generationStatisticOf(
      newState.game.board,
      action.currentGeneration,
      action.generationStartTime,
      Date.now()
    );
    newState.gameStatistic = GameUtils.gameStatisticOf(newState.game, action.gameStartTime, Date.now());
    return newState;
  }),
  on(GameActions.endGameSuccess, (state) => {
    return {
      ...state,
      running: false,
    };
  }),
  on(GameActions.patternSelected, (state, action) => {
    return {
      ...state,
      patternSelected: action.selectedPattern,
    };
  }),
  on(GameActions.applyPattern, (state, action) => {
    const newGame = deepCopy(state.game);
    GameUtils.applyPattern(newGame.board, action.row, action.column, state.patternSelected);
    return { ...state, game: newGame };
  }),
  on(GameActions.randomCells, (state) => {
    const newGame = deepCopy(state.game);
    GameUtils.randomizeCellStates(newGame.board);
    return { ...state, game: newGame };
  }),
  on(GameActions.resetCells, (state) => {
    const newGame = deepCopy(state.game);
    GameUtils.resetCellStates(newGame.board);
    return { ...state, game: newGame };
  }),
  on(GameActions.invertCells, (state) => {
    const newGame = deepCopy(state.game);
    GameUtils.invertCellStates(newGame.board);
    return { ...state, game: newGame };
  }),
  on(GameActions.applyRuleSet, (state, action) => {
    const newGame = deepCopy(state.game);
    newGame.ruleSet = action.ruleSet;
    return { ...state, game: newGame };
  }),
  on(GameActions.togglePause, (state) => {
    return {
      ...state,
      paused: !state.paused,
    };
  }),
  on(GameActions.stepChanged, (state, action) => {
    const newState = { ...state };
    switch (action.step) {
      case StepperStep.BOARD:
        newState.masked = true;
        newState.editable = false;
        break;
      case StepperStep.CELL:
        newState.masked = false;
        newState.editable = true;
        break;
      default:
        newState.masked = false;
        newState.editable = false;
    }
    return newState;
  })
);

function deepCopy(oldGame: Game): Game {
  // fixme: not so deep - is this the right way?
  const newRowsAndCells = new Map(oldGame.board.rowsAndCells);
  const newBoard = new Board(oldGame.board.width, oldGame.board.height, newRowsAndCells);
  const newGame = new Game(newBoard, oldGame.generations);
  newGame.ruleSet = oldGame.ruleSet;
  return newGame;
}
