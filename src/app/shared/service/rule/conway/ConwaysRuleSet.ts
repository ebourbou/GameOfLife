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
    super('conway', 'Conways original rules', 'Die von Conway ursprünglich verwendeten Regeln.', 3, 'B3/S23');
    this.rules.push(new ConwaysFirstRule(), new ConwaysSecondRule(), new ConwaysThirdRule(), new ConwaysFourthRule(), new DoNothingRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
