import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class AntiLifeRuleSet extends AbstractRuleSet {
  private rules: Rule[] = [];

  constructor() {
    super('antiLife', 'Anti Life', 'The black/white reversal of Conways Game of Life.', 3, 'B0123478/S01234678');
    this.rules.push(new GenericBirthRule([0, 1, 2, 3, 4, 7, 8]), new GenericSurviveRule([0, 1, 2, 3, 4, 6, 7, 8]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
