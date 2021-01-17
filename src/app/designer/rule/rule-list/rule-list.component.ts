import { Component, OnDestroy, OnInit } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/rule-set';
import { AbstractRuleService } from '../../../shared/service/rule/abstract-rule.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit, OnDestroy {
  ruleSets: RuleSet[];
  selected: RuleSet[];

  private subscription: Subscription;

  constructor(private ruleService: AbstractRuleService) {}

  ngOnInit(): void {
    this.subscription = this.ruleService.getRuleSets().subscribe((nextRuleSets) => {
      this.ruleSets = nextRuleSets;
      this.selected = [this.ruleSets[0]];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
