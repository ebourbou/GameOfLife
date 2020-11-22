import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/RuleSet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pattern } from '../../../shared/model/pattern';

@Component({
  selector: 'app-rule-step',
  templateUrl: './rule-step.component.html',
  styleUrls: ['./rule-step.component.scss'],
})
export class RuleStepComponent implements OnInit {
  @Output()
  public doRuleSetSelected: EventEmitter<RuleSet> = new EventEmitter();

  @Input()
  allRuleSets: [RuleSet];
  ruleSetFormGroup: FormGroup;

  @Input()
  ruleSetSelected: RuleSet;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ruleSetFormGroup = this.formBuilder.group({
      ruleSet: [this.allRuleSets[0], Validators.required],
    });
    this.onRuleSetSelected(this.allRuleSets[0]);
  }

  onRuleSetSelected(ruleSet: RuleSet): void {
    this.doRuleSetSelected.emit(ruleSet);
  }
}
