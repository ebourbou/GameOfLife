import { Cell } from "../../../shared/model/Cell";
import { CellState } from "../../../shared/model/CellState";
import { AbstractRule } from "../AbstractRule";

export class ConwaysFourthRule extends AbstractRule {
  constructor() {
    super(
      "Lebende Zellen mit mehr als drei lebenden Nachbarn sterben in der Folgegeneration an Überbevölkerung."
    );
  }

  doesMatch(cell: Cell): boolean {
    return cell.isAlive() && cell.livingNeighbours() > 3;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.DEAD;
  }
}
