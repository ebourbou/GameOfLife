import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pattern } from '../../../shared/model/pattern';

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

  onRandom(event: Event): void {
    this.doRandomCells.emit();
  }

  onReset(event: Event): void {
    this.doResetCells.emit();
  }

  onInvert(event: Event): void {
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
}

enum DrawMode {
  CELL,
  PATTERN,
}
