import { Game } from '../../game/model/game';

import { GameUtils } from './game-utils';

describe('GameUtils', () => {
  let board;
  const testPattern = {
    author: '',
    description: '',
    id: '',
    locked: false,
    name: '',
    type: '',
    sizeX: 3,
    sizeY: 3,
    pattern: 'X.X\nX.X\nX.X',
  };
  beforeEach(() => {
    board = GameUtils.build(10, 20);
  });
  it('should build a board', () => {
    expect(board).not.toBeNull();
  });
  it('should consider board size', () => {
    expect(board.height).toBe(20);
    expect(board.width).toBe(10);
    expect(board.cells.length).toBe(200);
  });
  it('should build a board containing rows and columns', () => {
    expect(board.rowsAndCells.size).toBe(20);
    expect(board.rowsAndCells.get(0).length).toBe(10);
  });

  it('should apply pattern', () => {
    GameUtils.applyPattern(board, 0, 0, testPattern);
    expect(board.cells[0].isAlive()).toBeTrue();
    expect(board.cells[1].isAlive()).toBeFalse();
    expect(board.cells[2].isAlive()).toBeTrue();
    expect(board.cells[3].isAlive()).toBeFalse();
    expect(board.cells[10].isAlive()).toBeTrue();
    expect(board.cells[11].isAlive()).toBeFalse();
    expect(board.cells[12].isAlive()).toBeTrue();

    expect(board.cells[20].isAlive()).toBeTrue();
    expect(board.cells[30].isAlive()).toBeFalse();
    expect(board.cells[199].isAlive()).toBeFalse();
  });
  it('should apply pattern so that it fits in board', () => {
    GameUtils.applyPattern(board, -2, -2, testPattern);
    expect(board.cells[0].isAlive()).toBeTrue();
    expect(board.cells[1].isAlive()).toBeFalse();
    expect(board.cells[2].isAlive()).toBeTrue();
  });

  it('should compute generation statistic', () => {
    GameUtils.applyPattern(board, 0, 0, testPattern);
    const statistic = GameUtils.generationStatisticOf(new Game(board, 33, 'testUser'), 7);
    expect(statistic.generation).toBe(8);
    expect(statistic.alive).toBe(6);
    expect(statistic.dead).toBe(194);
  });
});
