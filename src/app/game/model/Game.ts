import { Board } from '../../shared/model/Board';
import { RuleSet } from '../../shared/model/rule/RuleSet';

export class Game {
  ruleSet: RuleSet;

  constructor(public board: Board, public generations: number) {}

  nextGeneration(): void {
    this.board.nextGeneration(this.ruleSet);
  }
}
