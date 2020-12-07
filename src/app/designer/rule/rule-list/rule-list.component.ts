import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/model/user';
import { RuleSet } from '../../../shared/model/rule/RuleSet';
import { AuthService } from '../../../core/services/auth.service';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { AbstractRuleService } from '../../../shared/service/rule/abstract-rule.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {
  ruleSets: RuleSet[];
  selected: RuleSet[];
  user: User;

  constructor(private ruleService: AbstractRuleService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.ruleService.getRuleSets().subscribe((nextRuleSets) => {
      this.ruleSets = nextRuleSets;
      this.selected = [this.ruleSets[0]];
    });
    // TODO Wie war das mit unsubscribe und memory leaks?
  }
}
