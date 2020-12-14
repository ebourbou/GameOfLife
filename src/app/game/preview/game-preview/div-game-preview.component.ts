import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../model/Game';

@Component({
  selector: 'app-game-preview',
  templateUrl: './div-game-preview.component.html',
  styleUrls: ['./div-game-preview.component.scss'],
})
export class DivGamePreviewComponent implements OnInit {
  @Input() game: Game;

  constructor() {}

  ngOnInit(): void {}

  onRatingChanged($event: any): void {}
}
