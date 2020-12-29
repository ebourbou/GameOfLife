import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class LifeWithoutDeathRuleSet extends AbstractRuleSet {
  constructor() {
    super(
      'lifeWithoutDeath',
      'Life Without Death',
      'Eine expandierende Regel, die komplexe Flakes und Leitern erzeugt.',
      2,
      'B3/S012345678',
      '3'
    );
    this.rules.push(new GenericBirthRule([3]), new GenericSurviveRule([0, 1, 2, 3, 4, 5, 6, 7, 8]), new DieAlwaysRule());
  }
}
