import { Cell } from '../../shared/model/Cell';
import { Board } from '../model/Board';
import { CellState } from '../../shared/model/CellState';
import { GenerationStatistic } from '../../statistic/game-statistic/GenerationStatistic';
import { GameStatistic } from '../../statistic/game-statistic/GameStatistic';
import { Game } from '../model/Game';
import { Pattern } from '../../shared/model/pattern';

export class GameUtils {
  private static DEAD_BORDER_CELL: Cell = new Cell(-99, -99, CellState.DEAD);

  public static build(width: number, height: number): Board {
    const board = new Board(width, height, null);
    this.buildCells(board);
    return board;
  }

  public static applyPattern(board: Board, row: number, column: number, pattern: Pattern): void {
    let cursor = 0;
    const topRow = this.computeTopMostRow(board, row, pattern);
    const leftMostColumn = this.computeLeftMostColumn(board, column, pattern);
    const patternTrimmed = pattern.pattern.replace(/[\n\r]/g, '');
    for (let currentRow = topRow; currentRow < topRow + pattern.sizeY; currentRow++) {
      for (let currentColumn = leftMostColumn; currentColumn < leftMostColumn + pattern.sizeX; currentColumn++) {
        board.rowsAndCells.get(currentRow)[currentColumn].state = patternTrimmed.charAt(cursor) === 'O' ? CellState.ALIVE : CellState.DEAD;
        cursor++;
      }
    }
  }

  private static computeTopMostRow(board: Board, row: number, pattern: Pattern): number {
    const topMostRowByChoice = row - Math.floor(pattern.sizeY / 2);
    const fitsTop = topMostRowByChoice >= 0 ? topMostRowByChoice : 0;
    const fitsTopAndBottom = board.height - pattern.sizeY >= fitsTop ? fitsTop : board.height - pattern.sizeY;
    return fitsTopAndBottom;
  }

  private static computeLeftMostColumn(board: Board, column: number, pattern: Pattern): number {
    const leftMostColumnByChoice = column - Math.floor(pattern.sizeX / 2);
    const fitsLeft = leftMostColumnByChoice >= 0 ? leftMostColumnByChoice : 0;
    const fitsLeftAndRight = board.width - pattern.sizeX >= fitsLeft ? fitsLeft : board.width - pattern.sizeX;
    return fitsLeftAndRight;
  }

  public static generationStatisticOf(board: Board, currentGeneration: number, start: number, end: number): GenerationStatistic {
    return {
      currentGeneration: currentGeneration + 1,
      died: board.diedLastGeneration(),
      born: board.bornLastGeneration(),
      alive: board.alive(),
      dead: board.dead(),
      cellStateSwitches: board.cellStateSwitches(),
      pioneers: board.oldestCellsMap().get(currentGeneration) ? board.oldestCellsMap().get(currentGeneration) : 0,
      timePassed: end - start,
    };
  }

  public static gameStatisticOf(game: Game, start: number, end: number): GameStatistic {
    return {
      timePassed: end - start,
      totalCells: game.board.cells.length,
      totalGenerations: game.generations,
      alive: game.board.alive(),
      dead: game.board.dead(),
      immortals: game.board.oldestCellsMap().get(game.generations) ? game.board.oldestCellsMap().get(game.generations) : 0,
    };
  }

  private static buildCells(board: Board): void {
    const rowsAndCells = new Map<number, Array<Cell>>();

    for (let currentRow = 0; currentRow < board.height; currentRow++) {
      const rowArray = new Array<Cell>();
      for (let currentCol = 0; currentCol < board.width; currentCol++) {
        rowArray.push(new Cell(currentRow, currentCol, this.randomState()));
      }
      rowsAndCells.set(currentRow, rowArray);
    }
    board.rowsAndCells = rowsAndCells;
    board.cells.forEach((cell) => this.addNeighboursToCell(cell, rowsAndCells));
  }

  private static addNeighboursToCell(cell: Cell, rowsAndCells: Map<number, Array<Cell>>): void {
    [cell.row - 1, cell.row, cell.row + 1].forEach((current) => {
      const currentRow = rowsAndCells.has(current) ? rowsAndCells.get(current) : new Array<Cell>();
      this.addNeighboursAtRowToCell(currentRow, cell);
    });
  }

  private static addNeighboursAtRowToCell(currentRow: Cell[], cell: Cell): void {
    [cell.column - 1, cell.column, cell.column + 1].forEach((current) => {
      const neighbour = currentRow[current];
      if (neighbour) {
        if (neighbour !== cell) {
          cell.neighbours.push(neighbour);
        }
      } else {
        cell.neighbours.push(this.DEAD_BORDER_CELL);
      }
    });
  }

  private static randomState(): CellState {
    if (Math.round(Math.random() * 100) > 10) {
      return CellState.DEAD;
    } else {
      return CellState.ALIVE;
    }
  }
}
