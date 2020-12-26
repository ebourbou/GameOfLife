import { Rule } from '../../model/rule/rule';
import { Cell } from '../../model/cell';
import { AbstractRuleset } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class PedestrianLifeRuleset extends AbstractRuleset {
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
