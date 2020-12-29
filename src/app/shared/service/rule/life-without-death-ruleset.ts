import { AbstractRuleSet } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class LifeWithoutDeathRuleSet extends AbstractRuleSet {
  constructor() {
    super(
      'lifeWithoutDeath',
      'Life Without Death',
      'Eine expandierende Regel, die komplexe Flakes und Leitern erzeugt.',
      2,
      'B3/S012345678',
      '3'
    );
    this.rules.push(new GenericBirthRule([3]), new GenericSurviveRule([0, 1, 2, 3, 4, 5, 6, 7, 8]), new DieAlwaysRule());
  }
}
