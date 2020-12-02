import { Board } from '../../shared/model/Board';
import { RuleSet } from '../../shared/model/rule/RuleSet';

export class Game {
  public ruleSet: RuleSet;
  public id: string;
  public description: string;
  public author: string;

  constructor(public board: Board, public generations: number) {}

  nextGeneration(): void {
    this.board.nextGeneration(this.ruleSet);
  }
}
