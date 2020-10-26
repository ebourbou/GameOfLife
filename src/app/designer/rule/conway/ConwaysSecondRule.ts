import { Cell } from "../../../shared/model/Cell";
import { CellState } from "../../../shared/model/CellState";
import { AbstractRule } from "../AbstractRule";

export class ConwaysSecondRule extends AbstractRule {
  constructor() {
    super(
      "Lebende Zellen mit weniger als zwei lebenden Nachbarn sterben in der Folgegeneration an Einsamkeit."
    );
  }

  doesMatch(cell: Cell): boolean {
    return cell.isAlive() && cell.livingNeighbours() < 2;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.DEAD;
  }
}
