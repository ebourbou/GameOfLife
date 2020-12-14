import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';
import { Game } from '../model/Game';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { Controls } from '../model/Controls';
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
  allGenerationStatistics: GenerationStatistic[];
  generationStatistic: GenerationStatistic;
  loading: boolean;
  controls: Controls;
  running: boolean;
  paused: boolean;
  editable: boolean;
  masked: boolean;
  boardMaximized: boolean;
  readyToRun: boolean;
  readyForAnalysis: boolean;
  gameFinished: boolean;
}

export const initialState: GameState = {
  game: null,
  allPatterns: [],
  patternSelected: null,
  allRuleSets: [],
  ruleSetSelected: null,
  allGenerationStatistics: [],
  generationStatistic: null,
  loading: false,
  controls: null,
  running: false,
  paused: false,
  editable: false,
  masked: false,
  boardMaximized: false,
  readyToRun: false,
  readyForAnalysis: false,
  gameFinished: false,
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
  on(GameActions.startGameSuccess, (state) => {
    const newState = { ...state };
    newState.loading = false;
    newState.running = true;
    newState.readyToRun = false;
    return newState;
  }),
  on(GameActions.nextGeneration, (state) => {
    const newGame = deepCopy(state.game);
    newGame.nextGeneration();
    return { ...state, game: newGame };
  }),
  on(GameActions.nextGenerationSuccess, (state, action) => {
    const newState = { ...state };
    newState.allGenerationStatistics = state.allGenerationStatistics.concat(
      GameUtils.generationStatisticOf(state.game, action.currentGeneration)
    );
    newState.generationStatistic = newState.allGenerationStatistics[newState.allGenerationStatistics.length - 1];
    return newState;
  }),
  on(GameActions.endGameSuccess, (state) => {
    return {
      ...state,
      running: false,
      readyToRun: false,
      readyForAnalysis: true,
    };
  }),

  on(GameActions.startAnalysisSuccess, (state, action) => {
    const newGame = deepCopy(state.game);
    newGame.score = action.score;
    return { ...state, running: false, readyToRun: false, gameFinished: true, game: newGame };
  }),

  on(GameActions.patternSelected, (state, action) => {
    return {
      ...state,
      patternSelected: action.selectedPattern,
    };
  }),
  on(GameActions.applyPattern, (state, action) => {
    const newState = { ...state };
    if (state.patternSelected) {
      const newGame = deepCopy(state.game);
      GameUtils.applyPattern(newGame.board, action.row, action.column, state.patternSelected);
      newState.game = newGame;
    }
    return newState;
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
  on(GameActions.toggleMaximize, (state) => {
    return {
      ...state,
      boardMaximized: !state.boardMaximized,
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
      case StepperStep.PLAY:
        newState.masked = false;
        newState.editable = false;
        newState.boardMaximized = true;
        newState.readyToRun = true;
        break;
      case StepperStep.ANALYZE:
        newState.masked = false;
        newState.editable = false;
        newState.boardMaximized = false;
        newState.readyToRun = false;
        newState.readyForAnalysis = false;
        break;
      default:
        newState.masked = false;
        newState.editable = false;
        newState.boardMaximized = false;
        newState.readyToRun = false;
        newState.readyForAnalysis = false;
    }
    return newState;
  }),
  on(GameActions.addGame, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(GameActions.saveGameSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(GameActions.applyGame, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(GameActions.applyGameSuccess, (state, action) => {
    return {
      ...state,
      game: action.game,
      controls: new Controls(action.game.board.width, action.game.board.height, action.game.generations, state.controls.speed),
      loading: false,
    };
  }),
  on(GameActions.errorAction, (state) => {
    return {
      ...state,
      loading: false,
      running: false,
    };
  })
);

function deepCopy(oldGame: Game): Game {
  // fixme: not so deep - is this the right way?
  const newRowsAndCells = new Map(oldGame.board.rowsAndCells);
  const newBoard = new Board(oldGame.board.width, oldGame.board.height, newRowsAndCells);
  const newGame = new Game(newBoard, oldGame.generations, oldGame.author);
  newGame.ruleSet = oldGame.ruleSet;
  return newGame;
}
