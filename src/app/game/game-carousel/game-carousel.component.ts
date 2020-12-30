import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/game';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]),
      transition('* => void', [animate('600ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class GameCarouselComponent implements OnInit {
  public indices: Array<number> = new Array<number>();
  @Input() visibleGames = 1;

  @Input()
  public games: Game[];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.visibleGames; i++) {
      this.indices.push(i);
    }
  }

  private doPreviousClick(): void {
    this.indices[0] === 0 ? this.indices.unshift(this.games.length - 1) : this.indices.unshift(this.indices[0] - 1);
    this.indices.pop();
  }

  private doNextClick(): void {
    this.indices[this.visibleGames - 1] === this.games.length - 1
      ? this.indices.push(0)
      : this.indices.push(this.indices[this.visibleGames - 1] + 1);
    this.indices.shift();
  }
}
