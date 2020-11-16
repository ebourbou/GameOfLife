import { Cell } from '../../../model/Cell';
import { CellState } from '../../../model/CellState';
import { AbstractRule } from '../../../model/rule/AbstractRule';

export class ConwaysThirdRule extends AbstractRule {
  constructor() {
    super('Eine lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt in der Folgegeneration am Leben.');
  }

  doesMatch(cell: Cell): boolean {
    return cell.isAlive() && cell.livingNeighbours() >= 2 && cell.livingNeighbours() <= 3;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.ALIVE;
  }
}
