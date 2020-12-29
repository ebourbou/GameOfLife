import { AbstractRuleSet } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class AntiLifeRuleSet extends AbstractRuleSet {
  constructor() {
    super('antiLife', 'Anti Life', 'Die Schwarz-Weiss-Umkehrung von Conways Spiel des Lebens.', 3, 'B0123478/S01234678', '3');
    this.rules.push(new GenericBirthRule([0, 1, 2, 3, 4, 7, 8]), new GenericSurviveRule([0, 1, 2, 3, 4, 6, 7, 8]), new DieAlwaysRule());
  }
}
