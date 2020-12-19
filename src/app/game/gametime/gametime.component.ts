import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';

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
  public doAbortAndReset: EventEmitter<void> = new EventEmitter();

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

  constructor() {}

  ngOnInit(): void {}

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }

  abortAndReset(): void {
    this.doAbortAndReset.emit();
  }

  get progress(): number {
    return 1 + (this.generationStatistic ? (100 / this.generationStatistic.totalGenerations) * this.generationStatistic.generation : 0);
  }

  onStartGame(): void {
    this.doStartGame.emit();
  }

  onStartAnalysis(): void {
    this.doStartAnalysis.emit();
  }

  onToggleMaximizeBoard(): void {
    this.doToggleMaximize.emit();
  }
}
