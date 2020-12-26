import { Cell } from './cell';
import { CellState } from './cell-state';
import { Ruleset } from './rule/ruleset';

export class Board {
  constructor(public width: number, public height: number, public rowsAndCells: Map<number, Array<Cell>>) {}

  nextGeneration(ruleSet: Ruleset): void {
    this.cells.forEach((cell) => ruleSet.applyRules(cell));
    this.cells.forEach((cell) => cell.shiftToNextGeneration());
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
    return this.newlyDeads().length;
  }

  private newlyDeads(): Cell[] {
    return this.cells.filter((n) => n.state === CellState.DEAD && n.previousState === CellState.ALIVE);
  }

  averageAgeOfDeathLastGeneration(): number {
    const withoutInfants = this.newlyDeads()
      .map((c) => c.generationsSinceLastSwitch)
      .filter((c) => c > 1); // remove infancy deaths
    return withoutInfants.length > 1 ? Math.floor(withoutInfants.reduce((a, b) => a + b) / withoutInfants.length) : 1;
  }

  oldestDead(): number {
    return Math.max(...this.newlyDeads().map((c) => c.generationsSinceLastSwitch));
  }

  bornLastGeneration(): number {
    return this.cells.filter((n) => n.state === CellState.ALIVE && n.previousState === CellState.DEAD).length;
  }

  alive(): number {
    return this.livingOnes().length;
  }

  private livingOnes(): Cell[] {
    return this.cells.filter((n) => n.state === CellState.ALIVE);
  }

  ofAge(age: number): number {
    return this.livingOnes().filter((n) => n.generationsSinceLastSwitch === age).length;
  }

  dead(): number {
    return this.cells.filter((n) => n.state === CellState.DEAD).length;
  }

  neverTouched(): number {
    return this.cells.filter((n) => n.pristine === true).length;
  }
}
