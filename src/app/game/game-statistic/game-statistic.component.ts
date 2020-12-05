import { Component, Input, OnInit } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { GameStatisticUtils } from './game-statistic-utils';
import { Game } from '../model/Game';

@Component({
  selector: 'gol-game-statistic',
  templateUrl: './game-statistic.component.html',
  styleUrls: ['./game-statistic.component.scss'],
})
export class GameStatisticComponent implements OnInit {
  @Input()
  allGenerationStatistics: GenerationStatistic[];
  customColors: [];
  @Input()
  currentGame: Game;

  constructor() {
    this.customColors = GameStatisticUtils.getColors();
  }

  ngOnInit(): void {}
}
