import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../shared/model/board';
import { Pattern } from '../../shared/model/pattern';
import { Cell } from '../../shared/model/cell';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { ScreenSize } from '../../shared/service/screen-size.enum';
import { Orientation } from '../../shared/service/orientation.enum';

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
  public doStartFromScratch: EventEmitter<void> = new EventEmitter();

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
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

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

  onStartFromScratch(): void {
    this.doStartFromScratch.emit();
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
    classes.push(...this.screenAdaptationClasses());
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

  screenAdaptationClasses(): string[] {
    const classes = [];
    if (this.screenOrientation === Orientation.PORTRAIT) {
      classes.push('portrait');
    }
    if (this.screenSize < ScreenSize.WEB) {
      classes.push('handset');
    }
    return classes;
  }

  cellSizeClasses(): string {
    let cellSizeClass;
    if (this.board.width < 50) {
      cellSizeClass = 'cell-small';
    } else if (this.board.width < 200) {
      cellSizeClass = 'cell-medium';
    } else {
      cellSizeClass = 'cell-large';
    }
    return cellSizeClass;
  }
}
