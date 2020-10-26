import { Component, Input, OnInit } from "@angular/core";
import { GenerationStatistic } from "./GenerationStatistic";
import { GameStatistic } from "./GameStatistic";
import { ChartSeries } from "../../shared/sparkline/ChartSeries";

@Component({
  selector: "gol-game-statistic",
  templateUrl: "./game-statistic.component.html",
  styleUrls: ["./game-statistic.component.scss"],
})
export class GameStatisticComponent implements OnInit {
  @Input()
  gameStatistic: GameStatistic;

  allGenerations: GenerationStatistic[] = new Array<GenerationStatistic>();
  bornData: ChartSeries[] = new Array<ChartSeries>();
  diedData: ChartSeries[] = new Array<ChartSeries>();
  switchesData: ChartSeries[] = new Array<ChartSeries>();
  pioneerData: ChartSeries[] = new Array<ChartSeries>();
  timePassedData: ChartSeries[] = new Array<ChartSeries>();
  totalBirths: ChartSeries[] = new Array<ChartSeries>();
  totalDeaths: ChartSeries[] = new Array<ChartSeries>();
  aliveData: ChartSeries[] = new Array<ChartSeries>();
  deadData: ChartSeries[] = new Array<ChartSeries>();

  @Input()
  // todo: use to-chart-series.pipe instead of this method (fix lifecycle-problems first)
  set generationStatistic(value: GenerationStatistic) {
    if (value) {
      this.allGenerations.push(value);
      this.updateChartByReplace();
    }
  }

  // todo: by replace works, by push not --> change detection strategy
  private updateChartByReplace(): void {
    if (this.allGenerations.length % 5 === 0) {
      // for performance reason just do every fifth
      this.bornData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.born));
      this.diedData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.died));
      this.aliveData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.alive));
      this.deadData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.dead));
      this.switchesData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.cellStateSwitches));
      this.pioneerData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.pioneers));
      this.timePassedData = this.allGenerations.map((g) => new ChartSeries(g.currentGeneration, g.timePassed));
      const birthsSoFar = this.allGenerations.map((g) => g.born).reduce((a, b) => a + b, 0);
      this.totalBirths = [...this.totalBirths, new ChartSeries(this.currentGenNo, birthsSoFar)];
      const deathsSoFar = this.allGenerations.map((g) => g.died).reduce((a, b) => a + b, 0);
      this.totalDeaths = [...this.totalDeaths, new ChartSeries(this.currentGenNo, deathsSoFar)];
    }
  }

  // private updateChartByPush(): void {
  //   if (this.allGenerations.length % 5 === 0) {
  //     // for performance reason just do every fifth
  //     this.bornData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.born)
  //     );
  //     this.diedData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.died)
  //     );
  //     this.aliveData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.alive)
  //     );
  //     this.deadData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.dead)
  //     );
  //     this.switchesData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.cellStateSwitches)
  //     );
  //     this.pioneerData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.pioneers)
  //     );
  //     this.timePassedData.push(
  //       new ChartSeries(this.currentGenNo, this.currentGen.timePassed)
  //     );
  //     const birthsSoFar = this.allGenerations
  //       .map((g) => g.born)
  //       .reduce((a, b) => a + b, 0);
  //     this.totalBirths.push(new ChartSeries(this.currentGenNo, birthsSoFar));
  //     const deathsSoFar = this.allGenerations
  //       .map((g) => g.died)
  //       .reduce((a, b) => a + b, 0);
  //     this.totalDeaths.push(new ChartSeries(this.currentGenNo, deathsSoFar));
  //   }
  // }

  constructor() {}

  ngOnInit(): void {
    this.onReset();
  }

  onReset(): void {
    this.allGenerations = new Array<GenerationStatistic>();
    this.bornData = new Array<ChartSeries>();
    this.diedData = new Array<ChartSeries>();
    this.switchesData = new Array<ChartSeries>();
    this.pioneerData = new Array<ChartSeries>();
    this.timePassedData = new Array<ChartSeries>();
    this.totalBirths = new Array<ChartSeries>();
    this.totalDeaths = new Array<ChartSeries>();
    this.aliveData = new Array<ChartSeries>();
    this.deadData = new Array<ChartSeries>();
  }

  get currentGen(): GenerationStatistic {
    return this.allGenerations[this.currentGenNo];
  }

  get currentGenNo(): number {
    return this.allGenerations.length - 1;
  }
}
