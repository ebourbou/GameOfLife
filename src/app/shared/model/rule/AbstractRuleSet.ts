import { Cell } from '../Cell';
import { RuleSet } from './RuleSet';

export abstract class AbstractRuleSet implements RuleSet {
  id: string;
  shortName: string;
  description: string;
  difficulty: number;

  constructor(id: string, shortName: string, description: string, difficulty: number) {
    this.shortName = shortName;
    this.description = description;
    this.difficulty = difficulty;
  }

  abstract applyRules(cell: Cell): void;
}
