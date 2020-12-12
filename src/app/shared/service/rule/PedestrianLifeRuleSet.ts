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
      'Eine chaotische Regel, die stark dem normalen Leben ähnelt, mit vielen aufregenden natürlichen Technologien.',
      6,
      'B37/S23',
      '3'
    );
    this.rules.push(new GenericBirthRule([3, 7]), new GenericSurviveRule([2, 3]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
