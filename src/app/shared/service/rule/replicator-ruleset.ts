import { Rule } from '../../model/rule/rule';
import { Cell } from '../../model/cell';
import { AbstractRuleset } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class ReplicatorRuleset extends AbstractRuleset {
  private rules: Rule[] = [];

  constructor() {
    super('replicator', 'Replicator', 'Eine Regel, in der jedes Pattern ein Replikator ist.', 3, 'B1357/S1357', '3');
    this.rules.push(new GenericBirthRule([1, 3, 5, 7]), new GenericSurviveRule([1, 3, 5, 7]), new DieAlwaysRule());
  }

  applyRules(cell: Cell): void {
    this.rules.find((rule) => rule.doesMatch(cell)).apply(cell);
  }
}
