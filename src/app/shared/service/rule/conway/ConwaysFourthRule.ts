import { Cell } from '../../../model/Cell';
import { CellState } from '../../../model/CellState';
import { AbstractRule } from '../../../model/rule/AbstractRule';

export class ConwaysFourthRule extends AbstractRule {
  constructor() {
    super('Lebende Zellen mit mehr als drei lebenden Nachbarn sterben in der Folgegeneration an Überbevölkerung.');
  }

  doesMatch(cell: Cell): boolean {
    return cell.isAlive() && cell.livingNeighbours() > 3;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.DEAD;
  }
}
