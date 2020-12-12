import { AbstractRule } from '../../model/rule/AbstractRule';
import { Cell } from '../../model/Cell';

export class DoNothingRule extends AbstractRule {
  constructor() {
    super('Zellen verändern ihren Status nicht.');
  }

  doesMatch(cell: Cell): boolean {
    return true;
  }

  apply(cell: Cell): void {
    cell.nextState = cell.state;
  }
}
