import { Cell } from '../model/Cell';
import { Board } from '../model/Board';
import { CellState } from '../model/CellState';
import { GenerationStatistic } from '../model/generation-statistic';
import { Game } from '../../game/model/Game';
import { Pattern } from '../model/pattern';
import { Observable, of } from 'rxjs';

export class GameUtils {
  private static DEAD_BORDER_CELL: Cell = new Cell(-99, -99, CellState.DEAD);

  public static build(width: number, height: number): Board {
    const board = new Board(width, height, null);
    this.buildCells(board);
    return board;
  }

  public static applyPattern(board: Board, row: number, column: number, pattern: Pattern): void {
    return this.applyPatternFromString(board, row, column, pattern.pattern, pattern.sizeX, pattern.sizeY);
  }

  public static applyPatternFromString(board: Board, row: number, column: number, patternString: string, sizeX, sizeY): void {
    let cursor = 0;
    const topRow = this.computeTopMostRow(board, row, sizeY);
    const leftMostColumn = this.computeLeftMostColumn(board, column, sizeX);
    const patternTrimmed = patternString.replace(/[\n\r]/g, '');
    for (let currentRow = topRow; currentRow < topRow + sizeY; currentRow++) {
      for (let currentColumn = leftMostColumn; currentColumn < leftMostColumn + sizeX; currentColumn++) {
        board.rowsAndCells.get(currentRow)[currentColumn].state = patternTrimmed.charAt(cursor) !== '.' ? CellState.ALIVE : CellState.DEAD;
        cursor++;
      }
    }
  }

  private static computeTopMostRow(board: Board, row: number, sizeY: number): number {
    const topMostRowByChoice = row - Math.floor(sizeY / 2);
    const fitsTop = topMostRowByChoice >= 0 ? topMostRowByChoice : 0;
    return board.height - sizeY >= fitsTop ? fitsTop : board.height - sizeY;
  }

  private static computeLeftMostColumn(board: Board, column: number, sizeX: number): number {
    const leftMostColumnByChoice = column - Math.floor(sizeX / 2);
    const fitsLeft = leftMostColumnByChoice >= 0 ? leftMostColumnByChoice : 0;
    return board.width - sizeX >= fitsLeft ? fitsLeft : board.width - sizeX;
  }

  public static generationStatisticOf(game: Game, currentGeneration: number): GenerationStatistic {
    return {
      totalGenerations: game.generations,
      generation: currentGeneration + 1,
      died: game.board.diedLastGeneration(),
      born: game.board.bornLastGeneration(),
      alive: game.board.alive(),
      dead: game.board.dead(),
      averageAgeOfDeath: game.board.oldestDead(),
      immortals: game.board.ofAge(currentGeneration),
      pristine: game.board.neverTouched(),
    };
  }

  private static buildCells(board: Board): void {
    const rowsAndCells = new Map<number, Array<Cell>>();

    for (let currentRow = 0; currentRow < board.height; currentRow++) {
      const rowArray = new Array<Cell>();
      for (let currentCol = 0; currentCol < board.width; currentCol++) {
        rowArray.push(new Cell(currentRow, currentCol, CellState.DEAD));
      }
      rowsAndCells.set(currentRow, rowArray);
    }
    board.rowsAndCells = rowsAndCells;
    board.cells.forEach((cell) => this.addNeighboursToCell(cell, rowsAndCells));
  }

  public static buildBoardWithPattern(x: number, y: number, pattern: string): Board {
    const rowsAndCells = new Map<number, Array<Cell>>();

    for (let currentRow = 0; currentRow < y; currentRow++) {
      const rowArray = new Array<Cell>();
      for (let currentCol = 0; currentCol < x; currentCol++) {
        rowArray.push(
          new Cell(
            currentRow,
            currentCol,
            pattern.charAt(currentCol + currentRow * x + currentRow) === '.' ? CellState.DEAD : CellState.ALIVE
          )
        );
      }
      rowsAndCells.set(currentRow, rowArray);
    }
    const board = new Board(x, y, rowsAndCells);
    board.rowsAndCells = rowsAndCells;
    board.cells.forEach((cell) => this.addNeighboursToCell(cell, rowsAndCells));

    return board;
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

  public static randomizeCellStates(board: Board): void {
    board.cells.forEach((cell) => {
      if (Math.round(Math.random() * 100) > 10) {
        cell.state = CellState.DEAD;
      } else {
        cell.state = CellState.ALIVE;
      }
    });
  }

  public static save(board: Board): string {
    let patterStr = '';
    for (let currentRow = 0; currentRow < board.height; currentRow++) {
      for (let currentCol = 0; currentCol < board.width; currentCol++) {
        board.getCell(currentCol, currentRow).isAlive() ? (patterStr += 'O') : (patterStr += '.');
      }
      patterStr += '\n';
    }
    return patterStr.trim();
  }

  public static load(board: Board, pattern: string): void {
    board.rowsAndCells.clear();

    pattern.split('\n').forEach((value, y) => {
      const cells = new Array<Cell>();
      value.split('').forEach((character, x) => {
        cells.push(new Cell(y, x, character === '.' ? CellState.DEAD : CellState.ALIVE));
      });
      board.rowsAndCells.set(y, cells);
    });
  }
  public static resetCellStates(board: Board): void {
    board.cells.forEach((cell) => (cell.state = CellState.DEAD));
  }

  public static invertCellStates(board: Board): void {
    board.cells.forEach((cell) => (cell.state = cell.state === CellState.DEAD ? CellState.ALIVE : CellState.DEAD));
  }
}
