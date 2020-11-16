import { Cell } from '../../../model/Cell';
import { CellState } from '../../../model/CellState';
import { AbstractRule } from '../../../model/rule/AbstractRule';

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
