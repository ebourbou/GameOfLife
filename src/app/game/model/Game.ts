import { Board } from '../../shared/model/Board';
import { RuleSet } from '../../shared/model/rule/RuleSet';

export class Game {
  public ruleSet: RuleSet;
  public id = '' + Date.now();
  public description: string;
  public author = 'ANONYMOUS';
  public date = new Date();

  constructor(public board: Board, public generations: number) {
    this.description = `Spiel ${this.board.width} x ${this.board.height} x ${this.generations} von ${
      this.author
    } am ${this.date.toLocaleDateString('de-CH')} um ${this.date.toLocaleTimeString('de-CH')}`;
  }

  nextGeneration(): void {
    this.board.nextGeneration(this.ruleSet);
  }
}
