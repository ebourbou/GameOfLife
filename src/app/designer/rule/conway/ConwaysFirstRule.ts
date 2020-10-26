import { Cell } from "../../../shared/model/Cell";
import { CellState } from "../../../shared/model/CellState";
import { AbstractRule } from "../AbstractRule";

export class ConwaysFirstRule extends AbstractRule {
  constructor() {
    super(
      "Eine tote Zelle mit genau drei lebenden Nachbarn wird in der Folgegeneration neu geboren."
    );
  }

  doesMatch(cell: Cell): boolean {
    return !cell.isAlive() && cell.livingNeighbours() === 3;
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.ALIVE;
  }
}
