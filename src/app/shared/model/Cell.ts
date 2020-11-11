import { CellState } from './CellState';

export class Cell {
  neighbours: Cell[];
  public row: number;
  public column: number;
  public previousState: CellState;
  public state: CellState;
  public nextState: CellState;
  age = 0;

  constructor(row: number, column: number, state: CellState) {
    this.row = row;
    this.column = column;
    this.state = state;
    this.neighbours = new Array<Cell>();
  }

  isAlive(): boolean {
    return this.state === CellState.ALIVE;
  }

  switchToNextGeneration(): void {
    this.previousState = this.state;
    if (this.nextState === this.state) {
      this.age++;
    } else {
      this.state = this.nextState;
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
