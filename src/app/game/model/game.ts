import { Board } from '../../shared/model/board';
import { Score } from '../../statistic/service/score';
import { RuleSet } from '../../shared/model/rule/rule-set';
import { ConwayRuleSet } from '../../shared/service/rule/ConwayRuleSet';

export class Game {
  public name: string;
  public id = '' + Date.now();

  public get description(): string {
    return `Spiel ${this.board.width} x ${this.board.height} x ${this.generations} vom ` + this.dateAsString();
  }

  public author;
  public date = new Date();
  public ruleSet: RuleSet;
  public score: Score;
  public isPublic = false;

  constructor(public board: Board, public generations: number, user: string) {
    this.name = this.id;
    this.author = user;
  }

  nextGeneration(): void {
    if (!this.ruleSet) {
      // FIXME: Due to incorrect use of state the ruleSet might be not set always.
      this.ruleSet = new ConwayRuleSet();
    }
    this.board.nextGeneration(this.ruleSet);
  }

  dateAsString(): string {
    return this.date.toLocaleDateString('de-CH') + ' um ' + this.date.toLocaleTimeString('de-CH');
  }
}
