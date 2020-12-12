import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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
      this.doNextStepProgrammatically.emit();
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
