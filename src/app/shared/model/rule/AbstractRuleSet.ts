import { Cell } from '../Cell';
import { RuleSet } from './RuleSet';

export abstract class AbstractRuleSet implements RuleSet {
  id: string;
  shortName: string;
  description: string;
  difficulty: number;
  ruleStringBSnotation: string;
  demoPatternId: string;

  protected constructor(
    id: string,
    shortName: string,
    description: string,
    difficulty: number,
    ruleStringBSnotation: string,
    demoPatternId: string
  ) {
    this.shortName = shortName;
    this.description = description;
    this.difficulty = difficulty;
    this.ruleStringBSnotation = ruleStringBSnotation;
    this.demoPatternId = demoPatternId;
  }

  abstract applyRules(cell: Cell): void;
}
