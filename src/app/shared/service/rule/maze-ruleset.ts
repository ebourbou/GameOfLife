import { Rule } from '../../model/rule/rule';
import { Cell } from '../../model/cell';
import { AbstractRuleSet } from '../../model/rule/abstract-ruleset';
import { GenericBirthRule } from './generic-birth-rule';
import { GenericSurviveRule } from './generic-survive-rule';
import { DieAlwaysRule } from './die-always-rule';

export class MazeRuleSet extends AbstractRuleSet {
  constructor() {
    super('mazeRuleSet', 'Maze', 'Eine expandierende Regel, die sich zu labyrinthähnlichen Mustern entwickelt.', 3, 'B3/S23', '3');
    this.rules.push(new GenericBirthRule([3, 7]), new GenericSurviveRule([1, 2, 3, 4, 5]), new DieAlwaysRule());
  }
}
