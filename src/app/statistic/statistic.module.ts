import { NgModule } from '@angular/core';
import { GameStatisticComponent } from './game-statistic/game-statistic.component';
import { SharedModule } from '../shared/shared.module';
import { ToMeasureSeriesGroupedPipe } from './game-statistic/to-measure-series-grouped-pipe';
import { LineChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { LastGenerationToMeasurePipe } from './game-statistic/last-generation-to-measure.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { LastGenerationToPercentagePipe } from './game-statistic/last-generation-to-percentage.pipe';

@NgModule({
  declarations: [GameStatisticComponent, ToMeasureSeriesGroupedPipe, LastGenerationToMeasurePipe, LastGenerationToPercentagePipe],
  imports: [SharedModule, LineChartModule, NgxChartsModule, MatGridListModule],
  exports: [GameStatisticComponent, ToMeasureSeriesGroupedPipe, LastGenerationToMeasurePipe, LastGenerationToPercentagePipe],
})
export class StatisticModule {}
