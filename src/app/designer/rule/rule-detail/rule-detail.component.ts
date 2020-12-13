import { Component, Input, OnInit } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/RuleSet';
import { Pattern } from '../../../shared/model/pattern';
import { PatternService } from '../../../shared/service/patterns.service';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.scss'],
})
export class RuleDetailComponent implements OnInit {
  public demoPattern$: Observable<Pattern>;
  public innerRuleSet: RuleSet;

  @Input()
  set ruleSet(ruleSet: RuleSet) {
    this.innerRuleSet = ruleSet;
    this.loadDemoPatternOfRuleSet(ruleSet);
  }

  get ruleSet(): RuleSet {
    return this.innerRuleSet;
  }

  constructor(private patternService: PatternService) {}

  ngOnInit(): void {}

  loadDemoPatternOfRuleSet(ruleSet: RuleSet): void {
    this.demoPattern$ = from(this.patternService.getPattern(ruleSet.demoPatternId));
  }
}
