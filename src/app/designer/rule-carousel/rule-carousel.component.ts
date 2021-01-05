import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleSet } from '../../shared/model/rule/rule-set';

@Component({
  selector: 'app-rule-carousel',
  templateUrl: './rule-carousel.component.html',
  styleUrls: ['./rule-carousel.component.scss'],
})
export class RuleCarouselComponent implements OnInit {
  private currentIndex = 0;
  private noOfRulesVisible = 1;
  public indices: Array<number> = new Array<number>();

  @Input()
  set visibleRules(rules: number) {
    this.noOfRulesVisible = rules;
    this.computeIndicesAndShiftToCurrentRuleIndex();
  }

  get visibleRules(): number {
    return this.noOfRulesVisible;
  }

  @Input() ruleSize = 1;

  @Input()
  public ruleSets: RuleSet[];

  @Output()
  public doSelected: EventEmitter<RuleSet> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.computeIndicesAndShiftToCurrentRuleIndex();
  }

  private computeIndicesAndShiftToCurrentRuleIndex(): void {
    this.indices = new Array<number>();
    for (let i = 0; i < this.visibleRules; i++) {
      this.indices.push(i);
    }
    const originalRuleIndex = this.currentIndex;
    for (let current = 0; current < originalRuleIndex; current++) {
      this.onNextClick();
    }
  }

  onPreviousClick(): void {
    this.indices[0] === 0 ? this.indices.unshift(this.ruleSets.length - 1) : this.indices.unshift(this.indices[0] - 1);
    this.indices.pop();
    if (this.indices.length === 1) {
      this.onSelect(this.indices[0]);
    }
  }

  onNextClick(): void {
    this.indices[this.visibleRules - 1] === this.ruleSets.length - 1
      ? this.indices.push(0)
      : this.indices.push(this.indices[this.visibleRules - 1] + 1);
    this.indices.shift();
    if (this.indices.length === 1) {
      this.onSelect(this.indices[0]);
    }
  }

  onSelect(index: number): void {
    this.doSelected.emit(this.ruleSets[index]);
    this.currentIndex = index;
  }
}
