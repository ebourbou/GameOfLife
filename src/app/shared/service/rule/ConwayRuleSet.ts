import { AbstractRuleSet } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class ConwayRuleSet extends AbstractRuleSet {
  constructor() {
    super(
      'conway',
      'Conway',
      'Die von Conway ursprünglich definierten Regeln:\n' +
        'Eine tote Zelle mit genau drei lebenden Nachbarn wird in der Folgegeneration neu geboren.\n' +
        'Lebende Zellen mit weniger als zwei lebenden Nachbarn sterben in der Folgegeneration an Einsamkeit.\n' +
        'Eine lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt in der Folgegeneration am Leben.\n' +
        'Lebende Zellen mit mehr als drei lebenden Nachbarn sterben in der Folgegeneration an Überbevölkerung.\n' +
        'Alle anderen ändern ihren Zustand nicht.\n',
      3,
      'B3/S23',
      '3'
    );
    this.rules.push(new GenericBirthRule([3]), new GenericSurviveRule([2, 3]), new DieAlwaysRule());
  }
}
