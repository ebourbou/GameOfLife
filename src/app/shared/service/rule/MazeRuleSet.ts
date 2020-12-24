import { Rule } from '../../model/rule/Rule';
import { Cell } from '../../model/Cell';
import { AbstractRuleSet } from '../../model/rule/AbstractRuleSet';
import { GenericBirthRule } from './GenericBirthRule';
import { GenericSurviveRule } from './GenericSurviveRule';
import { DieAlwaysRule } from './DieAlwaysRule';

export class MazeRuleSet extends AbstractRuleSet {
  constructor() {
    super('mazeRuleSet', 'Maze', 'Eine expandierende Regel, die sich zu labyrinthähnlichen Mustern entwickelt.', 3, 'B3/S23', '3');
    this.rules.push(new GenericBirthRule([3, 7]), new GenericSurviveRule([1, 2, 3, 4, 5]), new DieAlwaysRule());
  }
}
