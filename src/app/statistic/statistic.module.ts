import { NgModule } from '@angular/core';
import { GameStatisticComponent } from './game-statistic/game-statistic.component';
import { SharedModule } from '../shared/shared.module';
import { ToChartSeriesPipe } from './game-statistic/to-chart-series.pipe';

@NgModule({
  declarations: [GameStatisticComponent, ToChartSeriesPipe],
  imports: [SharedModule],
  exports: [GameStatisticComponent],
})
export class StatisticModule {}
