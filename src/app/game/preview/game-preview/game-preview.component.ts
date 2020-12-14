import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../model/Game';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss'],
})
export class GamePreviewComponent implements OnInit {
  @Input() game: Game;

  constructor() {}

  ngOnInit(): void {}

  onRatingChanged($event: any): void {}
}
