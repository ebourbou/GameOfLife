import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-play-step',
  template: '',
  styles: [''],
})
export class PlayStepComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  @Output()
  public doNextStepProgrammatically: EventEmitter<void> = new EventEmitter();

  @Input()
  set isGameFinished(isGameFinished: boolean) {
    if (isGameFinished) {
      this.doNextStepProgrammatically.emit();
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
