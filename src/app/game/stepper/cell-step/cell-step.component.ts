import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pattern } from '../../../shared/model/pattern';
import { ScreenSize } from '../../../shared/service/screen-size.enum';
import { Orientation } from '../../../shared/service/orientation.enum';

@Component({
  selector: 'app-cell-step',
  templateUrl: './cell-step.component.html',
  styleUrls: ['./cell-step.component.scss'],
})
export class CellStepComponent implements OnInit {
  @Input()
  patternSelected: Pattern;

  drawMode: DrawMode;

  @Input()
  allPatterns: Pattern[];

  @Input()
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

  @Input()
  isBusy: boolean;

  @Output()
  public doPatternSelected: EventEmitter<Pattern> = new EventEmitter();
  @Output()
  private doRandomCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doResetCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doInvertCells: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.drawMode = DrawMode.CELL;
  }

  onPatternSelected(pattern: Pattern): void {
    this.drawMode = DrawMode.PATTERN;
    this.doPatternSelected.emit(pattern);
  }

  onRandom(): void {
    this.doRandomCells.emit();
  }

  onReset(): void {
    this.doResetCells.emit();
  }

  onInvert(): void {
    this.doInvertCells.emit();
  }

  onDeselectPattern(): void {
    this.drawMode = DrawMode.CELL;
    this.doPatternSelected.emit(null);
    this.patternSelected = null;
  }

  toggleDrawMode(): void {
    if (this.drawMode === DrawMode.CELL) {
      this.drawMode = DrawMode.PATTERN;
    } else {
      this.drawMode = DrawMode.CELL;
    }
  }

  visiblePatterns(): number {
    let patterns;
    if (this.screenSize === ScreenSize.HANDSET && this.screenOrientation === Orientation.PORTRAIT) {
      patterns = 1;
    } else if (this.screenSize === ScreenSize.HANDSET && this.screenOrientation === Orientation.LANDSCAPE) {
      patterns = 3;
    } else if (this.screenSize === ScreenSize.TABLET && this.screenOrientation === Orientation.PORTRAIT) {
      patterns = 3;
    } else {
      patterns = 6;
    }
    return patterns;
  }

  showPatternRating(): boolean {
    return false; // return this.screenSize === ScreenSize.WEB;
  }

  hideSecondaryButtonLabels(): boolean {
    return this.screenSize === 0;
  }
}

enum DrawMode {
  CELL,
  PATTERN,
}
