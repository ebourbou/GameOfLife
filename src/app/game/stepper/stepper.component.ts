import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Controls } from '../model/Controls';
import { Pattern } from '../../shared/model/pattern';
import { PatternDetailComponent } from '../../designer/pattern-detail/pattern-detail.component';
import { Board } from '../model/Board';
import { Cell } from '../../shared/model/Cell';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input()
  controls: Controls;

  patterns: Pattern[];
  groupedPatterns: Array<{ key; value }>;

  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();

  boardFormGroup: FormGroup;
  cellsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.patterns = [
      { id: 'one', name: 'dummyPatternOne', description: 'Ypsum', author: 'joe', pattern: '', type: 'gliders', sizeX: 0, sizeY: 0 },
      { id: 'two', name: 'dummyPatternTwo', description: 'Blablq', author: 'joe', pattern: '', type: 'fireballs', sizeX: 0, sizeY: 0 },
      { id: 'three', name: 'dummyPatternThree', description: 'Lorem', author: 'Doe', pattern: '', type: 'gliders', sizeX: 0, sizeY: 0 },
      { id: 'four', name: 'dummyPatternFour', description: 'Est', author: 'joe', pattern: '', type: 'fireballs', sizeX: 0, sizeY: 0 },
    ];
    this.groupedPatterns = this.toGroupedPatternMap(this.patterns);

    this.boardFormGroup = this.formBuilder.group({
      sizeX: [this.controls.xAxisSize],
      sizeY: [this.controls.yAxisSize],
      generations: [this.controls.generations],
    });
    this.cellsFormGroup = this.formBuilder.group({
      patterns: [''],
    });
  }

  private toGroupedPatternMap(patterns: Pattern[]): Array<{ key; value }> {
    const grouped = new Array<{ key; value }>();
    patterns.forEach((p) => {
      if (!grouped.find((g) => g.key === p.type)) {
        const newGroup = new Array<Pattern>();
        newGroup.push(p);
        grouped.push({ key: p.type, value: newGroup });
      } else {
        grouped.find((g) => g.key === p.type).value.push(p);
      }
    });
    return grouped;
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
}
