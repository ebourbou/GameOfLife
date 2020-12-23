import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../shared/model/Board';
import { Pattern } from '../../shared/model/pattern';
import { Cell } from '../../shared/model/Cell';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { CellState } from '../../shared/model/CellState';

@Component({
  selector: 'gol-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();

  @Output()
  public doAbortAndReset: EventEmitter<void> = new EventEmitter();

  @Output()
  public doStartGame: EventEmitter<void> = new EventEmitter();

  @Output()
  public doSwitchCellState: EventEmitter<Cell> = new EventEmitter();

  @Output()
  public doStartAnalysis: EventEmitter<GenerationStatistic[]> = new EventEmitter();

  @Output()
  public doToggleMaximize: EventEmitter<void> = new EventEmitter();

  @Input()
  public board: Board;

  @Input()
  patternSelected: Pattern;

  @Input()
  generationStatistic: GenerationStatistic;

  @Input()
  allGenerationStatistics: GenerationStatistic[];

  @Input()
  isMasked: boolean;

  @Input()
  isEditable: boolean;

  @Input()
  isLoading: boolean;

  @Input()
  isRunning: boolean;

  @Input()
  isBoardMaximized: boolean;

  @Input()
  isReadyToRun: boolean;

  @Input()
  isReadyForAnalysis: boolean;

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

  onToggleMaximize(): void {
    this.doToggleMaximize.emit();
  }

  onStartGame(): void {
    this.doStartGame.emit();
  }

  onStartAnalysis(): void {
    this.doStartAnalysis.emit(this.allGenerationStatistics);
  }

  getBoardClasses(): string[] {
    const classes = ['board'];
    if (this.isBoardMaximized) {
      classes.push('isMaximized');
    }
    if (this.isMasked) {
      classes.push('isMasked');
    } else if (this.isEditable) {
      if (this.patternSelected) {
        classes.push('isApplyPattern');
      } else {
        classes.push('isApplyCellState');
      }
    }
    return classes;
  }

  /* Freehand drawing mode*/
  onMouseMove(mouseEvent: MouseEvent, cell: Cell): void {
    if (mouseEvent.buttons > 0) {
      this.onClick(cell);
    }
  }

  onClick(cell: Cell): void {
    if (this.isEditable) {
      if (this.patternSelected) {
        this.onApplyPattern(cell);
      } else {
        this.doSwitchCellState.emit(cell);
      }
    }
  }
}
