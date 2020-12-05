import { Pipe, PipeTransform } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { GameStatisticUtils } from './game-statistic-utils';

@Pipe({
  name: 'lastGenerationToPercentage',
  pure: true,
})
export class LastGenerationToPercentagePipe implements PipeTransform {
  transform(value: GenerationStatistic[], metrics: number[]): any[] {
    const lastGen = value[value.length - 1];
    const onePercent = (lastGen.dead + lastGen.alive) / 100;
    const inPercentage = { ...lastGen };
    inPercentage.died = Math.floor(lastGen.died / onePercent);
    inPercentage.born = Math.floor(lastGen.born / onePercent);
    inPercentage.alive = Math.floor((lastGen.alive - lastGen.immortals) / onePercent);
    inPercentage.dead = Math.floor((lastGen.dead - lastGen.pristine) / onePercent);
    inPercentage.pristine = Math.floor(lastGen.pristine / onePercent);
    inPercentage.immortals = Math.floor(lastGen.immortals / onePercent);
    return metrics.map((metric) => GameStatisticUtils.toMeasure(inPercentage, metric, GameStatisticUtils.toName(metric)));
  }
}
