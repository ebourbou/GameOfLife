import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/Game';

@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss'],
})
export class GameCarouselComponent implements OnInit {
  @Input()
  public games: Game[];

  private currentGameIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  private onPreviousClick(): void {
    const previous = this.currentGameIndex - 1;
    this.currentGameIndex = previous < 0 ? this.games.length - 1 : previous;
  }

  private onNextClick(): void {
    const next = this.currentGameIndex + 1;
    this.currentGameIndex = next === this.games.length ? 0 : next;
  }

  onSelect(): void {
    console.log('do it!');
  }
}
