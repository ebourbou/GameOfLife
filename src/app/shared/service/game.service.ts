import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Game } from '../../game/model/Game';
import { GameUtils } from './GameUtils';
import { Cell } from '../model/Cell';
import { APIService } from '../../API.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private static fromAwsGame(awsGame): Game {
    const game = new Game(GameUtils.build(awsGame.sizeX, awsGame.sizeY), awsGame.generations);
    GameUtils.applyPatternFromString(game.board, 0, 0, awsGame.pattern, awsGame.sizeX, awsGame.sizeY);
    game.author = awsGame.author;
    game.description = awsGame.description;
    game.id = awsGame.id;
    return game;
  }

  private static toAwsGame(game: Game): any {
    return {
      description: game.description,
      generations: game.generations,
      id: game.id,
      author: game.author,
      pattern: GameService.cellStatesAsDotOString(game.board.cells),
      sizeX: game.board.width,
      sizeY: game.board.height,
    };
  }

  private static cellStatesAsDotOString(cells: Array<Cell>): string {
    return cells.map((cell) => (cell.state ? 'O' : '.')).join('');
  }

  constructor(private api: APIService) {}

  getAllGames(): Observable<Game[]> {
    return from(this.api.ListGames().then((result) => result.items.map((item) => GameService.fromAwsGame(item))));
  }

  getGame(id: string): Observable<Game> {
    return from(this.api.GetGame(id, null).then((result) => GameService.fromAwsGame(result)));
  }

  addGame(game: Game): Observable<Game> {
    const input: any = GameService.toAwsGame(game);
    delete input.id;
    return from(this.api.CreateGame(input).then((result) => GameService.fromAwsGame(result)));
  }
}
