import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls } from '../../model/Controls';
import { Pattern } from '../../../shared/model/pattern';

@Component({
  selector: 'app-play-step',
  templateUrl: './play-step.component.html',
  styleUrls: ['./play-step.component.scss'],
})
export class PlayStepComponent implements OnInit {
  @Output()
  public doStartGame: EventEmitter<void> = new EventEmitter();
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();
  @Output()
  public doTogglePause: EventEmitter<boolean> = new EventEmitter();

  @Input()
  controls: Controls;

  @Input()
  isRunning: boolean;

  playFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.playFormGroup = this.formBuilder.group({
      speed: [this.controls.speed],
    });
  }

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }

  onStartGame(): void {
    this.doStartGame.emit();
  }

  onTogglePause(): void {
    this.doTogglePause.emit();
  }
}
