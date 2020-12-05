import { CellState } from './CellState';

export class Cell {
  neighbours: Cell[];
  public row: number;
  public column: number;
  public previousState: CellState;
  public state: CellState;
  public nextState: CellState;
  public pristine: boolean;
  public generationsSinceLastSwitch = 0;

  constructor(row: number, column: number, state: CellState) {
    this.row = row;
    this.column = column;
    this.state = state;
    this.neighbours = new Array<Cell>();
    this.pristine = true;
  }

  isAlive(): boolean {
    return this.state === CellState.ALIVE;
  }

  shiftToNextGeneration(): void {
    this.previousState = this.state;
    if (this.nextState === this.state) {
      this.generationsSinceLastSwitch++;
    } else {
      this.state = this.nextState;
      this.generationsSinceLastSwitch = 0;
      this.pristine = false;
    }
    this.nextState = null;
  }

  livingNeighbours(): number {
    return this.neighbours.filter((n) => n.state === CellState.ALIVE).length;
  }

  switchState(): void {
    this.state = this.state === CellState.ALIVE ? CellState.DEAD : CellState.ALIVE;
  }

  setState(newState: CellState): void {
    this.state = newState;
  }
}
