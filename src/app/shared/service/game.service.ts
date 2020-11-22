import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../../game/model/Game';
import { GameUtils } from './GameUtils';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getAllGames(): Observable<Game[]> {
    return of(new Array<Game>());
  }

  getGames(irgendwelcheKriterien: any): Observable<Game[]> {
    return this.getAllGames();
  }

  getGame(id: string): Observable<Game> {
    return of(new Game(GameUtils.build(10, 10), 50));
  }

  saveGame(game: Game): Observable<string> {
    return of('newId');
    /* komprimieren entweder durch Umwandlung in 36er system:
          parseInt( '1001011000', 2).toString(36); // returns 'go' (instead of '258', which would be the hex version)
          parseInt('go', 36).toString(2); // returns  '1001011000';
        https://www.smashingmagazine.com/2011/10/optimizing-long-lists-of-yesno-values-with-javascript/
     ... oder mit Integer als Bit-Feld  ... ich suche noch...
     */
  }
}
