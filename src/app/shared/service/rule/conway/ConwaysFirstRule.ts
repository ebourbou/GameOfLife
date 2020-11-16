import { Cell } from '../../../model/Cell';
import { CellState } from '../../../model/CellState';
import { AbstractRule } from '../../../model/rule/AbstractRule';

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
