import { Rule } from "./Rule";
import { Cell } from "../../shared/model/Cell";

export class RuleSet {
  shortName: string;
  description: string;

  rules: Rule[] = [];

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
