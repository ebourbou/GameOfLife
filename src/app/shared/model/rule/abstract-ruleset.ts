import { Cell } from '../cell';
import { RuleSet } from './rule-set';
import { Rule } from './rule';

export abstract class AbstractRuleSet implements RuleSet {
  id: string;
  shortName: string;
  description: string;
  difficulty: number;
  ruleStringBSnotation: string;
  demoPatternId: string;
  rules: Rule[] = [];

  protected constructor(
    id: string,
    shortName: string,
    description: string,
    difficulty: number,
    ruleStringBSnotation: string,
    demoPatternId: string
  ) {
    this.id = id;
    this.shortName = shortName;
    this.description = description;
    this.difficulty = difficulty;
    this.ruleStringBSnotation = ruleStringBSnotation;
    this.demoPatternId = demoPatternId;
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
