import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { ScreenSize } from '../../shared/service/screen-size.enum';
import { Orientation } from '../../shared/service/orientation.enum';

@Component({
  selector: 'app-gametime',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gametime.component.html',
  styleUrls: ['./gametime.component.scss'],
})
export class GametimeComponent implements OnInit {
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();

  @Output()
  public doStartFromScratch: EventEmitter<void> = new EventEmitter();

  @Output()
  public doStartGame: EventEmitter<void> = new EventEmitter();

  @Output()
  public doStartAnalysis: EventEmitter<void> = new EventEmitter();

  @Output()
  public doToggleMaximize: EventEmitter<void> = new EventEmitter();

  @Input()
  generationStatistic: GenerationStatistic;

  @Input()
  isRunning: boolean;

  @Input()
  isReadyToRun: boolean;

  @Input()
  isBoardMaximized: boolean;

  @Input()
  isReadyForAnalysis: boolean;

  @Input()
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

  constructor() {}

  ngOnInit(): void {}

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }

  startFromScratch(): void {
    this.doStartFromScratch.emit();
  }

  get progress(): number {
    return 1 + (this.generationStatistic ? (100 / this.generationStatistic.totalGenerations) * this.generationStatistic.generation : 0);
  }

  onStartGame(): void {
    this.doStartGame.emit();
  }

  showSmallSlider(): boolean {
    return this.screenOrientation === Orientation.PORTRAIT && this.screenSize === ScreenSize.HANDSET;
  }

  onStartAnalysis(): void {
    this.doStartAnalysis.emit();
  }

  onToggleMaximizeBoard(): void {
    this.doToggleMaximize.emit();
  }
}
