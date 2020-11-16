import { Cell } from '../Cell';
import { RuleSet } from './RuleSet';

export abstract class AbstractRuleSet implements RuleSet {
  shortName: string;
  description: string;

  constructor(shortName: string, description: string) {
    this.shortName = shortName;
    this.description = description;
  }

  abstract applyRules(cell: Cell): void;
}
