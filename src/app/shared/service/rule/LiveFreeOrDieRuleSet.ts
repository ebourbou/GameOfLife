import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class LiveFreeOrDieRuleSet extends AbstractRuleSet {
  private rules: Rule[] = [];

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

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
