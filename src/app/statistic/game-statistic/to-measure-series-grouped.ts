import { Pipe, PipeTransform } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { GameStatisticUtils } from './game-statistic-utils';

@Pipe({
  name: 'toMeasureSeriesGrouped',
  pure: true,
})
export class ToMeasureSeriesGroupedPipe implements PipeTransform {
  transform(value: GenerationStatistic[], metrics: number[]): any[] {
    const seriesOfMeasuresGrouped = [];
    metrics.forEach((metric) => {
      const seriesOfMeasure = value.map((statistic) => {
        return GameStatisticUtils.toMeasure(statistic, metric, statistic.generation);
      });
      seriesOfMeasuresGrouped.push({ name: GameStatisticUtils.toName(metric), series: seriesOfMeasure });
    });
    return seriesOfMeasuresGrouped;
  }
}
