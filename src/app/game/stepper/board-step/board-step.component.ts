import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Controls } from '../../model/controls';
import { DefaultsService } from '../../../shared/service/defaults.service';

@Component({
  selector: 'app-board-step',
  templateUrl: './board-step.component.html',
  styleUrls: ['./board-step.component.scss'],
})
export class BoardStepComponent implements OnInit {
  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();

  @Input()
  controls: Controls;

  @Input()
  isBusy: boolean;

  private sizes: Map<string, { x: number; y: number }>;

  get selectedSize(): string {
    return [...this.sizes.entries()].find((entry) => entry[1].x === this.controls.xAxisSize && entry[1].y === this.controls.yAxisSize)[0];
  }

  constructor(private defaults: DefaultsService) {}

  ngOnInit(): void {
    this.loadSizes();
  }

  onChangeGenerations(generations: number): void {
    this.doChangeGenerations.emit(generations);
  }

  onChangeSize($event: any): void {
    this.doResize.emit(this.sizes.get($event));
  }

  private loadSizes(): void {
    this.defaults.defaultSizes().subscribe((sizes) => {
      this.sizes = sizes;
    });
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
