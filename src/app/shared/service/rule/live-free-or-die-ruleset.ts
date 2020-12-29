import { AbstractRuleSet } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class LiveFreeOrDieRuleSet extends AbstractRuleSet {
  constructor() {
    super(
      'liveFreeOrDieRuleSet',
      'Live Free Or Die',
      'Eine explodierende Regel, bei der nur Zellen ohne Nachbarn überleben. Sie hat viele Raumschiffe, Puffer und Oszillatoren, einige von unendlich erweiterbarer Grösse und Periode.',
      6,
      'B2/S0',
      '3'
    );
    this.rules.push(new GenericBirthRule([2]), new GenericSurviveRule([0]), new DieAlwaysRule());
  }
}
