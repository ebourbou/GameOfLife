import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { ConwaysRuleSet } from '../../shared/service/rule/conway/ConwaysRuleSet';

@Component({
  styleUrls: ['rules-slide.component.scss'],
  templateUrl: 'rules-slide.component.html',
})
export class SlideExplanationRules implements SlideComponent {
  @Input() data: any;
  conwayRuleset = new ConwaysRuleSet();
}
