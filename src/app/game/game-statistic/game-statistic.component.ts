import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { GameStatisticUtils } from './game-statistic-utils';
import { Game } from '../model/game';
import { Score } from '../../statistic/service/score';
import { ScreenSize } from '../../shared/service/screen-size.enum';
import { Orientation } from '../../shared/service/orientation.enum';

@Component({
  selector: 'app-game-statistic',
  templateUrl: './game-statistic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./game-statistic.component.scss'],
})
export class GameStatisticComponent implements OnInit {
  @Input()
  allGenerationStatistics: GenerationStatistic[];
  customColors: [];
  @Input()
  currentGame: Game;
  @Input()
  score: Score;

  @Input()
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

  constructor() {
    this.customColors = GameStatisticUtils.getColors();
  }

  ngOnInit(): void {}
}
