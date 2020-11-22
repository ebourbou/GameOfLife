import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/RuleSet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pattern } from '../../../shared/model/pattern';

@Component({
  selector: 'app-save-step',
  templateUrl: './save-step.component.html',
  styleUrls: ['./save-step.component.scss'],
})
export class SaveStepComponent implements OnInit {
  @Output()
  public doSaveGame: EventEmitter<void> = new EventEmitter();

  saveFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.saveFormGroup = this.formBuilder.group({});
  }

  onSaveGame(): void {
    this.doSaveGame.emit();
  }
}
