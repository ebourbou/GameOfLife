import { AbstractRule } from "./AbstractRule";
import { Cell } from "../../shared/model/Cell";

export class DoNothingRule extends AbstractRule {
  constructor() {
    super("Zellen verändern ihren Status nicht.");
  }

  doesMatch(cell: Cell): boolean {
    return true;
  }

  apply(cell: Cell): void {
    cell.nextState = cell.state;
  }
}
