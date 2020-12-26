import { Cell } from '../../../model/cell';
import { CellState } from '../../../model/cell-state';
import { AbstractRule } from '../../../model/rule/abstract-rule';

export class ConwaysFirstRule extends AbstractRule {
  constructor() {
    super('Eine tote Zelle mit genau drei lebenden Nachbarn wird in der Folgegeneration neu geboren.');
  }

  doesMatch(cell: Cell): boolean {
    return !cell.isAlive() && cell.livingNeighbours() === 3;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.ALIVE;
  }
}
