import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Controls } from '../../model/controls';
import { DefaultsService } from '../../../shared/service/defaults.service';
import { ScreenSize } from '../../../shared/service/screen-size.enum';
import { Orientation } from '../../../shared/service/orientation.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-step',
  templateUrl: './board-step.component.html',
  styleUrls: ['./board-step.component.scss'],
})
export class BoardStepComponent implements OnInit, OnDestroy {
  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();

  @Input()
  controls: Controls;

  @Input()
  isBusy: boolean;

  @Input()
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

  private sizes: Map<string, { x: number; y: number }>;
  private subsription: Subscription;

  get selectedSize(): string {
    return [...this.sizes.entries()].find((entry) => entry[1].x === this.controls.xAxisSize && entry[1].y === this.controls.yAxisSize)[0];
  }

  constructor(private defaults: DefaultsService) {}

  ngOnInit(): void {
    this.subsription = this.defaults.defaultSizes().subscribe((sizes) => {
      this.sizes = sizes;
    });
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  onChangeGenerations(generations: number): void {
    this.doChangeGenerations.emit(generations);
  }

  onChangeSize($event: any): void {
    this.doResize.emit(this.sizes.get($event));
  }

  screenAdaptationClasses(): string[] {
    const classes = [];
    if (this.screenOrientation === Orientation.PORTRAIT && this.screenSize === ScreenSize.HANDSET) {
      classes.push('board-step-narrow');
    } else {
      classes.push('board-step-wide');
    }
    return classes;
  }
}
