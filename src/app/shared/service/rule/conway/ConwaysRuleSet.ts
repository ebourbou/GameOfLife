import { ConwaysFirstRule } from './ConwaysFirstRule';
import { ConwaysSecondRule } from './ConwaysSecondRule';
import { ConwaysThirdRule } from './ConwaysThirdRule';
import { ConwaysFourthRule } from './ConwaysFourthRule';
import { DoNothingRule } from '../DoNothingRule';
import { Rule } from '../../../model/rule/Rule';
import { Cell } from '../../../model/Cell';
import { AbstractRuleSet } from '../../../model/rule/AbstractRuleSet';

export class ConwaysRuleSet extends AbstractRuleSet {
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
