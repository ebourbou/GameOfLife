import { Rule } from './rule';
import { Cell } from '../cell';

export interface Ruleset {
  id: string;
  shortName: string;
  description: string;
  difficulty: number;
  ruleStringBSnotation: string;
  demoPatternId: string;

  applyRules(cell: Cell): void;
}
