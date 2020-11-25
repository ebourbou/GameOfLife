import { ConwaysFirstRule } from './ConwaysFirstRule';
import { ConwaysSecondRule } from './ConwaysSecondRule';
import { ConwaysThirdRule } from './ConwaysThirdRule';
import { ConwaysFourthRule } from './ConwaysFourthRule';
import { DoNothingRule } from '../../../model/rule/DoNothingRule';
import { Rule } from '../../../model/rule/Rule';
import { Cell } from '../../../model/Cell';
import { AbstractRuleSet } from '../../../model/rule/AbstractRuleSet';

export class ConwaysRuleSet extends AbstractRuleSet {
  private rules: Rule[] = [];

  constructor() {
    super('conway', "Conway's original rules", 'Die von Conway ursprünglich verwendeten Regeln.');
    this.rules.push(new ConwaysFirstRule(), new ConwaysSecondRule(), new ConwaysThirdRule(), new ConwaysFourthRule(), new DoNothingRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
