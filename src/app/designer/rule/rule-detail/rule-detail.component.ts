import { Component, Input, OnInit } from '@angular/core';
import { Ruleset } from '../../../shared/model/rule/ruleset';
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
  public innerRuleSet: Ruleset;

  @Input()
  set ruleSet(ruleSet: Ruleset) {
    this.innerRuleSet = ruleSet;
    this.loadDemoPatternOfRuleSet(ruleSet);
  }

  get ruleSet(): Ruleset {
    return this.innerRuleSet;
  }

  constructor(private patternService: PatternService) {}

  ngOnInit(): void {}

  loadDemoPatternOfRuleSet(ruleSet: Ruleset): void {
    this.demoPattern$ = from(this.patternService.getPattern(ruleSet.demoPatternId));
  }
}
