import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class MazeRuleSet extends AbstractRuleSet {
  private rules: Rule[] = [];

  constructor() {
    super('mazeRuleSet', 'Maze', 'An expanding rule that crystalizes to form maze-like designs..', 3, 'B3/S23');
    this.rules.push(new GenericBirthRule([3, 7]), new GenericSurviveRule([1, 2, 3, 4, 5]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
