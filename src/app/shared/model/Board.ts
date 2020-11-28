import { Cell } from './Cell';
import { CellState } from './CellState';
import { RuleSet } from './rule/RuleSet';

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

  ofAge(age: number): number {
    return this.cells.filter((n) => n.age === age).length;
  }

  dead(): number {
    return this.cells.filter((n) => n.state === CellState.DEAD).length;
  }

  cellStateSwitches(): number {
    return this.cells.filter((cell) => cell.previousState !== cell.state).length;
  }
}
