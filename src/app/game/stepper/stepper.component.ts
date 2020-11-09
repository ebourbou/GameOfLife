import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls } from '../model/Controls';
import { Pattern } from '../../shared/model/pattern';
import { PatternUtils } from '../../shared/service/pattern-util';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input()
  controls: Controls;

  groupedPatterns: Array<{ key; value }>;

  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();
  @Output()
  public doPatternSelected: EventEmitter<Pattern> = new EventEmitter();
  @Output()
  private doRandomCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doResetCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doInvertCells: EventEmitter<void> = new EventEmitter();

  boardFormGroup: FormGroup;
  cellsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  @Input()
  set allPatterns(allPatterns: Pattern[]) {
    this.groupedPatterns = PatternUtils.toGroupedPatternMap(allPatterns);
  }

  @Input()
  set patternSelected(pattern: Pattern) {}

  ngOnInit(): void {
    this.boardFormGroup = this.formBuilder.group({
      sizeX: [this.controls.xAxisSize],
      sizeY: [this.controls.yAxisSize],
      generations: [this.controls.generations],
    });
    this.cellsFormGroup = this.formBuilder.group({
      patterns: [''],
    });
  }

  public onResizeX(xValue: number): void {
    const y = this.boardFormGroup.get('sizeY').value;
    this.doResize.emit({ x: xValue, y });
  }

  public onResizeY(yValue: number): void {
    const x = this.boardFormGroup.get('sizeX').value;
    this.doResize.emit({ x, y: yValue });
  }

  onChangeGenerations(generations: number): void {
    this.doChangeGenerations.emit(generations);
  }

  onPatternSelected(pattern: Pattern): void {
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
}
