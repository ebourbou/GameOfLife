import { Cell } from './Cell';
import { CellState } from './CellState';
import { RuleSet } from '../../designer/rule/RuleSet';

export class Board {
  constructor(public width: number, public height: number, public rowsAndCells: Map<number, Array<Cell>>) {}

  nextGeneration(ruleSet: RuleSet): void {
    this.cells.forEach((cell) => ruleSet.applyRules(cell));
    this.cells.forEach((cell) => cell.switchToNextGeneration());
  }

  getCell(x: number, y: number): Cell {
    return this.rowsAndCells.get(y)[x];
  }

  get cells(): Array<Cell> {
    const cells = new Array<Cell>();
    this.rowsAndCells.forEach((row) => cells.push(...row.values()));
    return cells;
  }

  diedLastGeneration(): number {
    return this.cells.filter((n) => n.state === CellState.DEAD && n.previousState === CellState.ALIVE).length;
  }

  bornLastGeneration(): number {
    return this.cells.filter((n) => n.state === CellState.ALIVE && n.previousState === CellState.DEAD).length;
  }

  alive(): number {
    return this.cells.filter((n) => n.state === CellState.ALIVE).length;
  }

  dead(): number {
    return this.cells.filter((n) => n.state === CellState.DEAD).length;
  }

  cellStateSwitches(): number {
    return this.cells.filter((cell) => cell.previousState !== cell.state).length;
  }

  oldestCellsAsArray(): Cell[] {
    return this.cells
      .filter((n) => n.state === CellState.ALIVE)
      .filter((cell) => cell.age > 1)
      .sort((a, b) => a.age - b.age);
  }

  oldestCellsMap(): Map<number, number> {
    const mapOfOldest: Map<number, number> = new Map();
    this.oldestCellsAsArray().forEach((cell) => {
      mapOfOldest.has(cell.age) ? mapOfOldest.set(cell.age, mapOfOldest.get(cell.age) + 1) : mapOfOldest.set(cell.age, 1);
    });
    return mapOfOldest;
  }

  debug(): string {
    let result = '';
    this.cells.forEach((row) => (result += row.isAlive() ? 'O' : '.'));
    return result;
  }

  getWidth() {}
}
