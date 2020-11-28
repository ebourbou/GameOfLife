import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../shared/model/Board';
import { Pattern } from '../../shared/model/pattern';
import { Cell } from '../../shared/model/Cell';
import { GenerationStatistic } from '../../shared/model/generation-statistic';

@Component({
  selector: 'gol-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();

  @Output()
  public doAbortAndReset: EventEmitter<void> = new EventEmitter();

  @Input()
  public board: Board;

  @Input()
  patternSelected: Pattern;

  @Input()
  generationStatistic: GenerationStatistic;

  @Input()
  isMasked: boolean;

  @Input()
  isEditable: boolean;

  @Input()
  isLoading: boolean;

  @Input()
  isRunning: boolean;

  @Output()
  public doApplyPattern: EventEmitter<Cell> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onApplyPattern(centerCell: Cell): void {
    this.doApplyPattern.emit(centerCell);
  }

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }

  onAbortAndReset(): void {
    this.doAbortAndReset.emit();
  }
}
