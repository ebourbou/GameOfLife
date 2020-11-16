import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pattern } from '../../../shared/model/pattern';
import { PatternUtils } from '../../../shared/service/pattern-util';

@Component({
  selector: 'app-cell-step',
  templateUrl: './cell-step.component.html',
  styleUrls: ['./cell-step.component.scss'],
})
export class CellStepComponent implements OnInit {
  groupedPatterns: Array<{ key; value }>;

  @Input()
  patternSelected: Pattern;

  @Output()
  public doPatternSelected: EventEmitter<Pattern> = new EventEmitter();
  @Output()
  private doRandomCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doResetCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doInvertCells: EventEmitter<void> = new EventEmitter();

  cellsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cellsFormGroup = this.formBuilder.group({
      patterns: [''],
    });
  }

  @Input()
  set allPatterns(allPatterns: Pattern[]) {
    this.groupedPatterns = PatternUtils.toGroupedPatternMap(allPatterns);
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
