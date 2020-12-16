import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { GameUtils } from '../../shared/service/GameUtils';
import { Game } from '../../game/model/Game';
import { UserUtils } from '../../users/utils/user-utils';
import { BoardComponent } from '../../game/board/board.component';

@Component({
  styleUrls: ['start-slide.component.scss'],
  templateUrl: 'start-slide.component.html',
})
export class SlideStart implements SlideComponent, OnInit {
  @Input() data: any;
  @Input() game: Game;

  ngOnInit(): void {
    /*   this.game = new Game(GameUtils.build(100, 50));
    GameUtils.randomizeCellStates(this.game.board);*/
  }
}
