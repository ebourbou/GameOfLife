import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class AntiLifeRuleSet extends AbstractRuleSet {
  constructor() {
    super('antiLife', 'Anti Life', 'Die Schwarz-Weiss-Umkehrung von Conways Spiel des Lebens.', 3, 'B0123478/S01234678', '3');
    this.rules.push(new GenericBirthRule([0, 1, 2, 3, 4, 7, 8]), new GenericSurviveRule([0, 1, 2, 3, 4, 6, 7, 8]), new DieAlwaysRule());
  }
}
