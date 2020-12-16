import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { Game } from '../../game/model/Game';
import { GameUtils } from '../../shared/service/GameUtils';
import { Board } from '../../shared/model/Board';

@Component({
  styleUrls: ['start-slide.component.scss'],
  templateUrl: 'start-slide.component.html',
})
export class SlideStart implements SlideComponent, OnInit {
  @Input() data: any;
  gameBoard: Board;

  ngOnInit(): void {
    this.gameBoard = GameUtils.build(100, 50);
    GameUtils.randomizeCellStates(this.gameBoard);
  }
}
