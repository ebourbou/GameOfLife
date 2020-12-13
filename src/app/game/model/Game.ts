import { Board } from '../../shared/model/Board';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { Score } from '../../statistic/service/score';

export class Game {
  public name: string;
  public id = '' + Date.now();
  public description: string;
  public author = 'ANONYMOUS';
  public date = new Date();
  public ruleSet: RuleSet;
  public score: Score;

  constructor(public board: Board, public generations: number) {
    this.name = this.id;
    this.description = `Spiel ${this.name} ${this.board.width} x ${this.board.height} x ${this.generations} von ${
      this.author
    } am ${this.date.toLocaleDateString('de-CH')} um ${this.date.toLocaleTimeString('de-CH')}`;
  }

  nextGeneration(): void {
    this.board.nextGeneration(this.ruleSet);
  }
}
