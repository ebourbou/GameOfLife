import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class PedestrianLifeRuleSet extends AbstractRuleSet {
  private rules: Rule[] = [];

  constructor() {
    super(
      'pedestrianLifeRuleSet',
      'Pedestrian Life',
      'A chaotic rule that strongly resembles regular Life, with many exciting natural technologies.',
      6,
      'B37/S23'
    );
    this.rules.push(new GenericBirthRule([3, 7]), new GenericSurviveRule([2, 3]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
