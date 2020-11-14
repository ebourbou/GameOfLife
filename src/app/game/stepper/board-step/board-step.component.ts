import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Controls } from '../../model/Controls';

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

  boardFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.boardFormGroup = this.formBuilder.group({
      sizeX: [this.controls.xAxisSize],
      sizeY: [this.controls.yAxisSize],
      generations: [this.controls.generations],
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
}
