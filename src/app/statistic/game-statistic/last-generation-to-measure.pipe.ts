import { Pipe, PipeTransform } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { GameStatisticUtils } from './game-statistic-utils';

@Pipe({
  name: 'lastGenerationToMeasure',
  pure: true,
})
export class LastGenerationToMeasurePipe implements PipeTransform {
  transform(value: GenerationStatistic[], metrics: number[]): any[] {
    const lastGen = value[value.length - 1];
    const tweeked = { ...lastGen };
    tweeked.dead = lastGen.dead - lastGen.pristine; // same same but different type of dead
    tweeked.alive = lastGen.alive - lastGen.immortals; // same same but different
    return metrics.map((metric) => GameStatisticUtils.toMeasure(tweeked, metric, GameStatisticUtils.toName(metric)));
  }
}
