import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Game } from '../../game/model/Game';
import { GameUtils } from './GameUtils';
import { Cell } from '../model/Cell';
import { ConwaysRuleSet } from './rule/conway/ConwaysRuleSet';
import { APIService } from '../../API.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private static fromAwsGame(awsGame): Game {
    const game = new Game(GameUtils.build(awsGame.sizeX, awsGame.sizeY), awsGame.generations);
    GameUtils.applyPatternFromString(game.board, 0, 0, awsGame.pattern, awsGame.sizeX, awsGame.sizeY);
    game.ruleSet = new ConwaysRuleSet(); // todo use RuleService
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

  // private static chunksOfMax16CellStatesAsString(cells: Array<Cell>): Array<string> {
  //   const chunks = Array<string>();
  //   const counter = cells.length / 16;
  //   for (let i = 0; i <= counter; i++) {
  //     chunks.push(this.cellStatesAsString(cells.slice(i, i + 16))); // or shorter if less than 16 left
  //   }
  //   return chunks;
  // }

  // private static cellStatesAsString(cells: Array<Cell>): string {
  //   return cells.map((cell) => cell.state.toString()).join('');
  // }

  private static cellStatesAsDotOString(cells: Array<Cell>): string {
    return cells.map((cell) => (cell.state ? 'O' : '.')).join('');
  }

  // Looks good ... doesn't work
  // if you try again, remember, packs cell states in oneZero format, not DotO
  // TODO remove that eventually: https://www.smashingmagazine.com/2011/10/optimizing-long-lists-of-yesno-values-with-javascript/
  // private static pack(cells: Array<Cell>): string {
  //   let packed = '';
  //   for (const chunk of this.chunksOfMax16CellStatesAsString(cells)) {
  //     packed += parseInt(chunk, 2).toString(36); // first binary string to number than to string base 36
  //   }
  //   return packed;
  // }

  // TODO remove
  // private static unpack(packed: string): string {
  //   let unpacked = '';
  //   for (let i = 0; i < packed.length; i++) {
  //     unpacked += parseInt(packed.charAt(i), 36).toString(2);
  //   }
  //   return unpacked;
  // }

  constructor(private api: APIService) {}

  getAllGames(): Observable<Game[]> {
    return from(this.api.ListGames().then((result) => result.items.map((item) => GameService.fromAwsGame(item))));
  }

  getGame(id: string): Observable<Game> {
    return from(this.api.GetGame(id).then((result) => GameService.fromAwsGame(result)));
  }

  addGame(game: Game): Observable<Game> {
    const input: any = GameService.toAwsGame(game);
    delete input.id;
    return from(this.api.CreateGame(input).then((result) => GameService.fromAwsGame(result)));
  }
}
