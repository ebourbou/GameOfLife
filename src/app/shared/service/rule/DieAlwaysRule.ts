import { AbstractRule } from '../../model/rule/AbstractRule';
import { Cell } from '../../model/Cell';
import { CellState } from '../../model/CellState';

export class DieAlwaysRule extends AbstractRule {
  constructor() {
    super('Zellen sterben immer.');
  }

  doesMatch(cell: Cell): boolean {
    return true;
  }

  apply(cell: Cell): void {
    cell.nextState = CellState.DEAD;
  }
}
