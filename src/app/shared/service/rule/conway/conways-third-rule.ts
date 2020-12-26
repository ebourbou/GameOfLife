import { Cell } from '../../../model/cell';
import { CellState } from '../../../model/cell-state';
import { AbstractRule } from '../../../model/rule/abstract-rule';

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
