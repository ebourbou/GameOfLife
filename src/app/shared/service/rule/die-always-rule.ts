import { AbstractRule } from '../../model/rule/abstract-rule';
import { Cell } from '../../model/cell';
import { CellState } from '../../model/cell-state';

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
