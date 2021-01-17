import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/rule-set';
import { ScreenSize } from '../../../shared/service/screen-size.enum';
import { Orientation } from '../../../shared/service/orientation.enum';

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

  @Input()
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

  constructor() {}

  ngOnInit(): void {
    this.onRuleSetSelected(this.allRuleSets[0]);
  }

  onRuleSetSelected(ruleSet: RuleSet): void {
    this.doRuleSetSelected.emit(ruleSet);
  }

  visibleRules(): number {
    let rules;
    if (this.screenSize === ScreenSize.HANDSET) {
      rules = 1;
    } else if (this.screenOrientation === Orientation.PORTRAIT) {
      rules = 2;
    } else if (this.screenSize === ScreenSize.TABLET && this.screenOrientation === Orientation.LANDSCAPE) {
      rules = 3;
    } else {
      rules = 4;
    }
    return rules;
  }
}
