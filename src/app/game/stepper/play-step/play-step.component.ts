import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-step',
  template: '',
  styles: [''],
})
export class PlayStepComponent implements OnInit {
  @Output()
  public doNextStepProgrammatically: EventEmitter<void> = new EventEmitter();

  @Input()
  set isGameFinished(isGameFinished: boolean) {
    if (isGameFinished) {
      this.doNextStepProgrammatically.emit(); // hop over play step
      this.doNextStepProgrammatically.emit(); // hop over analysis step
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
