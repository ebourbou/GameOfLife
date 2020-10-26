import { Pipe, PipeTransform } from "@angular/core";
import { GenerationStatistic } from "./GenerationStatistic";
import { ChartSeries } from "../../shared/sparkline/ChartSeries";

@Pipe({
  name: "toChartSeries",
  pure: false,
})
export class ToChartSeriesPipe implements PipeTransform {
  transform(value: GenerationStatistic[], metricField: any): ChartSeries[] {
    return value.map((v) => {
      let metric: number;
      switch (metricField) {
        case Metric.BORN: {
          metric = v.born;
          break;
        }
        case Metric.DIED: {
          metric = v.died;
          break;
        }
        case Metric.SWITCHES: {
          metric = v.cellStateSwitches;
          break;
        }
        case Metric.PIONEERS: {
          metric = v.pioneers;
          break;
        }
        default: {
          metric = 0;
          break;
        }
      }
      return new ChartSeries(v.currentGeneration, metric);
    });
  }
}

enum Metric {
  BORN,
  DIED,
  SWITCHES,
  PIONEERS,
}
