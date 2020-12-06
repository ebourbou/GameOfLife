import { Rule } from './Rule';
import { Cell } from '../Cell';

export interface RuleSet {
  id: string;
  shortName: string;
  description: string;
  difficulty: number;

  applyRules(cell: Cell): void;
}
