import { Component, OnInit } from '@angular/core';
import { RuleSet } from '../../../shared/model/rule/RuleSet';
import { AbstractRuleService } from '../../../shared/service/rule/abstract-rule.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {
  ruleSets: RuleSet[];
  selected: RuleSet[];

  constructor(private ruleService: AbstractRuleService) {}

  ngOnInit(): void {
    this.ruleService.getRuleSets().subscribe((nextRuleSets) => {
      this.ruleSets = nextRuleSets;
      this.selected = [this.ruleSets[0]];
    });
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
