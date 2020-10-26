import { Cell } from "../../../shared/model/Cell";
import { CellState } from "../../../shared/model/CellState";
import { AbstractRule } from "../AbstractRule";

export class ConwaysThirdRule extends AbstractRule {
  constructor() {
    super(
      "Eine lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt in der Folgegeneration am Leben."
    );
  }

  doesMatch(cell: Cell): boolean {
    return (
      cell.isAlive() &&
      cell.livingNeighbours() >= 2 &&
      cell.livingNeighbours() <= 3
    );
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.ALIVE;
  }
}
