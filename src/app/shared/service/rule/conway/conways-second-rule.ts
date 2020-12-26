import { Cell } from '../../../model/cell';
import { CellState } from '../../../model/cell-state';
import { AbstractRule } from '../../../model/rule/abstract-rule';

export class ConwaysSecondRule extends AbstractRule {
  constructor() {
    super('Lebende Zellen mit weniger als zwei lebenden Nachbarn sterben in der Folgegeneration an Einsamkeit.');
  }

  doesMatch(cell: Cell): boolean {
    return cell.isAlive() && cell.livingNeighbours() < 2;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.DEAD;
  }
}
