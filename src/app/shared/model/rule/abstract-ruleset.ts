import { Cell } from '../cell';
import { Ruleset } from './ruleset';

export abstract class AbstractRuleset implements Ruleset {
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
    this.id = id;
    this.shortName = shortName;
    this.description = description;
    this.difficulty = difficulty;
    this.ruleStringBSnotation = ruleStringBSnotation;
    this.demoPatternId = demoPatternId;
  }

  abstract applyRules(cell: Cell): void;
}
