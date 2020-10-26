import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import * as d3 from "d3";
import { ChartSeries } from "./ChartSeries";

/*
 * Based on https://levelup.gitconnected.com/sparklines-with-angular-and-d3-d279dbac0c38
 * */
@Component({
  selector: "gol-spark",
  templateUrl: "./sparkline.component.html",
  styleUrls: ["./sparkline.component.scss"],
})
export class SparklineComponent implements AfterViewInit {
  @Input() lineColor: number[] = [70, 130, 180, 1]; // The RGBA value representing the color of the sparkline
  // @Input() margin = 0; // The margin to apply to sizing calculations - default to 0 but will typically be 20-24 pixels.
  @ViewChild("chart", { static: false }) chart: ElementRef<SVGElement>;
  @ViewChild("container", { static: false }) container: ElementRef<HTMLDivElement>;

  private height: number;
  private svg: any;
  private width: number;

  @Input()
  maxX: number;

  @Input()
  maxY: number;

  @Input()
  metric: number;

  @Input()
  title: string;

  @Input()
  set data(data: ChartSeries[]) {
    this.buildSparkline(data);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.resize();
    this.svg = d3.select(this.chart.nativeElement);
  }

  @HostListener("window:resize", ["$event"])
  onResize(): void {
    this.resize();
  }

  private buildSparkline(data: ChartSeries[]): void {
    const xScale: any = d3.scaleLinear().domain([0, this.maxX]).range([0, this.width]);
    const yScale: any = d3.scaleLinear().domain([0, this.maxY]).range([this.height, 0]);
    const line: any = d3
      .line<ChartSeries>()
      .curve(d3.curveCardinal)
      .x((d) => xScale(d.xAxis))
      .y((d) => yScale(d.yAxis));
    this.svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", `rgba(${this.lineColor[0]},${this.lineColor[1]},${this.lineColor[2]},${this.lineColor[3]})`)
      .style("stroke-width", "2")
      .style("width", `${this.width}px`);
  }

  private resize(): void {
    // We know how big we should be based on our parent element - and its offsetHeight/offsetWidth properties
    this.height = this.container.nativeElement.parentElement.offsetHeight;
    this.width = this.container.nativeElement.parentElement.offsetWidth;
    this.chart.nativeElement.style.height = `${this.height}px`;
    this.chart.nativeElement.style.maxHeight = `${this.height}px`;
    this.chart.nativeElement.style.maxWidth = `${this.width}px`;
    this.chart.nativeElement.style.minHeight = `${this.height}px`;
    this.chart.nativeElement.style.minWidth = `${this.width}px`;
    this.chart.nativeElement.style.width = `${this.width}px`;
    this.container.nativeElement.style.height = `${this.height}px`;
    this.container.nativeElement.style.maxHeight = `${this.height}px`;
    this.container.nativeElement.style.maxWidth = `${this.width}px`;
    this.container.nativeElement.style.minHeight = `${this.height}px`;
    this.container.nativeElement.style.minWidth = `${this.width}px`;
    this.container.nativeElement.style.width = `${this.width}px`;
  }
}
