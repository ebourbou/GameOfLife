import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/rule-set';

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

  @Input()
  ruleSetSelected: RuleSet;

  @Input()
  isBusy: boolean;

  constructor() {}

  ngOnInit(): void {
    this.onRuleSetSelected(this.allRuleSets[0]);
  }

  onRuleSetSelected(ruleSet: RuleSet): void {
    this.doRuleSetSelected.emit(ruleSet);
  }
}
