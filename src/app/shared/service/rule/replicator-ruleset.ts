import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class ReplicatorRuleSet extends AbstractRuleSet {
  constructor() {
    super('replicator', 'Replicator', 'Eine Regel, in der jedes Pattern ein Replikator ist.', 3, 'B1357/S1357', '3');
    this.rules.push(new GenericBirthRule([1, 3, 5, 7]), new GenericSurviveRule([1, 3, 5, 7]), new DieAlwaysRule());
  }
}
