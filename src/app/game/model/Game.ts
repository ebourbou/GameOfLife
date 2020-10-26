import { Board } from "./Board";
import { ConwaysRuleSet } from "../../designer/rule/conway/ConwaysRuleSet";

export class Game {
  constructor(public board: Board, public generations: number, public ruleSet: ConwaysRuleSet) {}

  nextGeneration(): void {
    this.board.nextGeneration(this.ruleSet);
  }
}
