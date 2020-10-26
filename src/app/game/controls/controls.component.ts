import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DefaultsService } from "../../shared/service/defaults.service";
import { Controls } from "../model/Controls";

@Component({
  selector: "gol-game-controls",
  templateUrl: "./controls.component.html",
  styleUrls: ["./controls.component.scss"],
})
export class ControlsComponent implements OnInit {
  @Input()
  controls: Controls;

  @Output()
  public doPlay: EventEmitter<any> = new EventEmitter();
  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();

  constructor(private defaults: DefaultsService) {}

  ngOnInit(): void {}

  public onPlay(): void {
    this.doPlay.emit();
  }

  public onResize(size: any): void {
    this.doResize.emit(size);
  }

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }

  onChangeGenerations(generations: string): void {
    this.doChangeGenerations.emit(Number(generations));
  }
}
