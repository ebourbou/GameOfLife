import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { AbstractRuleService } from '../../shared/service/rule/abstract-rule.service';

@Component({
  selector: 'app-rule-carousel',
  templateUrl: './rule-carousel.component.html',
  styleUrls: ['./rule-carousel.component.scss'],
})
export class RuleCarouselComponent implements OnInit {
  private currentIndex = 0;

  @Input()
  public ruleSets: RuleSet[];

  @Output()
  public doSelected: EventEmitter<RuleSet> = new EventEmitter();

  @Input()
  public autoLoadRules: boolean;

  constructor(private ruleService: AbstractRuleService) {}

  ngOnInit(): void {
    if (this.autoLoadRules) {
      this.loadRuleSets();
    }
  }

  private onPreviousClick(): void {
    const previous = this.currentIndex - 1;
    this.currentIndex = previous < 0 ? this.ruleSets.length - 1 : previous;
    this.doSelected.emit(this.ruleSets[this.currentIndex]);
  }

  private onNextClick(): void {
    const next = this.currentIndex + 1;
    this.currentIndex = next === this.ruleSets.length ? 0 : next;
    this.doSelected.emit(this.ruleSets[this.currentIndex]);
  }

  private loadRuleSets(): void {
    this.ruleService.getRuleSets().subscribe((ruleSets) => {
      this.ruleSets = ruleSets;
      this.currentIndex = 0;
    });
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
