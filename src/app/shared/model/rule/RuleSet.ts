import { Rule } from './Rule';
import { Cell } from '../Cell';

export interface RuleSet {
  shortName: string;
  description: string;

  applyRules(cell: Cell): void;
}
