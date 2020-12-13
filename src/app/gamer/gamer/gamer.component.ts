import { Component, OnInit } from '@angular/core';
import { Game } from '../../game/model/Game';
import { GameService } from '../../shared/service/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gamer',
  templateUrl: './gamer.component.html',
  styleUrls: ['./gamer.component.scss'],
})
export class GamerComponent implements OnInit {
  columns = ['description', 'author', 'date', 'ruleSet', 'score'];
  games: Game[];
  expandedElement: Game;
  $games: Observable<Game>;
  isLoading = true;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe((games) => {
      this.games = games;
    });
    this.isLoading = false;
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
