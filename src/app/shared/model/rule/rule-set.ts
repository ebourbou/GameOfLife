import { Cell } from '../cell';

export interface RuleSet {
  id: string;
  shortName: string;
  description: string;
  difficulty: number;
  ruleStringBSnotation: string;
  demoPatternId: string;

  applyRules(cell: Cell): void;
}
