import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';

import { Game } from '../../game/model/game';
import { UserUtils } from '../../users/utils/user-utils';
import { BoardComponent } from '../../game/board/board.component';
import { User } from '../../shared/model/user';
import { GameUtils } from '../../shared/service/game-utils';

@Component({
  styleUrls: ['game-slide.component.scss'],
  templateUrl: 'game-slide.component.html',
})
export class SlideGame implements SlideComponent, OnInit {
  @Input() data: any;
  @Input() game: Game;

  ngOnInit(): void {
    this.game = new Game(GameUtils.build(60, 30), 50, 'nobody');
    GameUtils.randomizeCellStates(this.game.board);
  }
}
