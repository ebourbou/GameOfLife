import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { AbstractRuleService } from '../../shared/service/rule/abstract-rule.service';
import { RuleSet } from '../../shared/model/rule/rule-set';

@Component({
  styleUrls: ['rules-slide.component.scss'],
  templateUrl: 'rules-slide.component.html',
})
export class SlideExplanationRulesComponent implements SlideComponent, OnInit {
  @Input() data = '';
  conwayRuleset: RuleSet;

  constructor(private ruleService: AbstractRuleService) {}

  ngOnInit(): void {
    this.ruleService.getRuleSet('conway').subscribe((r) => (this.conwayRuleset = r));
  }
}
