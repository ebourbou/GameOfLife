import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ruleset } from '../../../shared/model/rule/ruleset';

@Component({
  selector: 'app-rule-step',
  templateUrl: './rule-step.component.html',
  styleUrls: ['./rule-step.component.scss'],
})
export class RuleStepComponent implements OnInit {
  @Output()
  public doRuleSetSelected: EventEmitter<Ruleset> = new EventEmitter();

  @Input()
  allRuleSets: [Ruleset];

  @Input()
  ruleSetSelected: Ruleset;

  @Input()
  isBusy: boolean;

  constructor() {}

  ngOnInit(): void {
    this.onRuleSetSelected(this.allRuleSets[0]);
  }

  onRuleSetSelected(ruleSet: Ruleset): void {
    this.doRuleSetSelected.emit(ruleSet);
  }
}
