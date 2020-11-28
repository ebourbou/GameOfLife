import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';

@Component({
  selector: 'app-gametime',
  templateUrl: './gametime.component.html',
  styleUrls: ['./gametime.component.scss'],
})
export class GametimeComponent implements OnInit {
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();

  @Output()
  public doAbortAndReset: EventEmitter<void> = new EventEmitter();

  @Input()
  generationStatistic: GenerationStatistic;

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
}
