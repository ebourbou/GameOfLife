import { Board } from '../../shared/model/board';
import { Score } from '../../statistic/service/score';
import { Ruleset } from '../../shared/model/rule/ruleset';

export class Game {
  public name: string;
  public id = '' + Date.now();

  public get description(): string {
    return `Spiel ${this.board.width} x ${this.board.height} x ${this.generations} am ` + this.dateAsString();
  }

  public author;
  public date = new Date();
  public ruleSet: Ruleset;
  public score: Score;
  public isPublic = false;

  constructor(public board: Board, public generations: number, user: string) {
    this.name = this.id;
    this.author = user;
  }

  nextGeneration(): void {
    this.board.nextGeneration(this.ruleSet);
  }

  dateAsString(): string {
    return this.date.toLocaleDateString('de-CH') + ' um ' + this.date.toLocaleTimeString('de-CH');
  }
}
