import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class ReplicatorRuleSet extends AbstractRuleSet {
  private rules: Rule[] = [];

  constructor() {
    super('replicator', 'Replicator', 'A rule in which every pattern is a replicator..', 3, 'B1357/S1357');
    this.rules.push(new GenericBirthRule([1, 3, 5, 7]), new GenericSurviveRule([1, 3, 5, 7]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
