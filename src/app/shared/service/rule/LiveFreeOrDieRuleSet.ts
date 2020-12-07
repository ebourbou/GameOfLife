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
      'An exploding rule in which only cells with no neighbors survive. It has many spaceships, puffers, and oscillators, some of infinitely extensible size and period.',
      6,
      'B2/S0'
    );
    this.rules.push(new GenericBirthRule([2]), new GenericSurviveRule([0]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
