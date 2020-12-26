import { ConwaysFirstRule } from './conways-first-rule';
import { ConwaysSecondRule } from './conways-second-rule';
import { ConwaysThirdRule } from './conways-third-rule';
import { ConwaysFourthRule } from './conways-fourth-rule';
import { DoNothingRule } from '../do-nothing-rule';
import { Rule } from '../../../model/rule/rule';
import { Cell } from '../../../model/cell';
import { AbstractRuleset } from '../../../model/rule/abstract-ruleset';

export class ConwaysRuleSet extends AbstractRuleset {
  private rules: Rule[] = [];

  constructor() {
    super(
      'conway',
      'Conways original rules',
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
    this.rules.push(new ConwaysFirstRule(), new ConwaysSecondRule(), new ConwaysThirdRule(), new ConwaysFourthRule(), new DoNothingRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}