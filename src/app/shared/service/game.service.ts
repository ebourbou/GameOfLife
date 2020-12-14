import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Game } from '../../game/model/Game';
import { GameUtils } from './GameUtils';
import { Cell } from '../model/Cell';
import { APIService } from '../../API.service';
import { AbstractRuleService } from './rule/abstract-rule.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private api: APIService, private ruleService: AbstractRuleService) {}

  getAllGames(): Observable<Game[]> {
    return from(this.api.ListGames().then((result) => result.items.map((item) => this.fromAwsGame(item))));
  }

  getGame(id: string): Observable<Game> {
    return from(this.api.GetGame(id).then((result) => this.fromAwsGame(result)));
  }

  addGame(game: Game): Observable<Game> {
    const input: any = this.toAwsGame(game);
    delete input.id;
    return from(this.api.CreateGame(input).then((result) => this.fromAwsGame(result)));
  }

  private fromAwsGame(awsGame): Game {
    const game = new Game(GameUtils.build(awsGame.sizeX, awsGame.sizeY), awsGame.generations, awsGame.userId);
    GameUtils.applyPatternFromString(game.board, 0, 0, awsGame.pattern, awsGame.sizeX, awsGame.sizeY);
    game.description = awsGame.description;
    game.id = awsGame.id;
    this.ruleService.getRuleSet(awsGame.ruleSetId).subscribe((r) => (game.ruleSet = r));
    game.date = new Date(awsGame.creationDate);
    game.score = { overallScore: awsGame.score, tags: JSON.parse(awsGame.scoreTags) };
    return game;
  }

  private toAwsGame(game: Game): any {
    return {
      name: game.name,
      userId: game.author,
      description: game.description,
      generations: game.generations,
      id: game.id,
      pattern: this.cellStatesAsDotOString(game.board.cells),
      sizeX: game.board.width,
      sizeY: game.board.height,
      ruleSetId: game.ruleSet.id,
      creationDate: game.date,
      score: game.score.overallScore,
      scoreTags: JSON.stringify(game.score.tags),
    };
  }

  private cellStatesAsDotOString(cells: Array<Cell>): string {
    return cells.map((cell) => (cell.state ? 'O' : '.')).join('');
  }
}
