import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ruleset } from '../../shared/model/rule/ruleset';
import { AbstractRuleService } from '../../shared/service/rule/abstract-rule.service';

@Component({
  selector: 'app-rule-carousel',
  templateUrl: './rule-carousel.component.html',
  styleUrls: ['./rule-carousel.component.scss'],
})
export class RuleCarouselComponent implements OnInit {
  private currentIndex = 0;
  public indices: Array<number> = new Array<number>();
  @Input() visibleRules = 3;

  @Input()
  public ruleSets: Ruleset[];

  @Output()
  public doSelected: EventEmitter<Ruleset> = new EventEmitter();

  @Input()
  public autoLoadRules: boolean;

  constructor(private ruleService: AbstractRuleService) {}

  ngOnInit(): void {
    for (let i = 0; i < this.visibleRules; i++) {
      this.indices.push(i);
    }
    if (this.autoLoadRules) {
      this.loadRuleSets();
    } else {
      this.onSelect(0);
    }
  }

  private onPreviousClick(): void {
    this.indices.pop();
    this.indices[0] === 0 ? this.indices.unshift(this.ruleSets.length - 1) : this.indices.unshift(this.indices[0] - 1);
    //this.onDeselect();
    //this.appRef.tick();
  }

  private onNextClick(): void {
    this.indices[this.visibleRules - 1] === this.ruleSets.length - 1
      ? this.indices.push(0)
      : this.indices.push(this.indices[this.visibleRules - 1] + 1);
    //this.onDeselect();
    this.indices.shift();
    //this.appRef.tick();
  }

  onSelect(index: number): void {
    this.doSelected.emit(this.ruleSets[index]);
    this.currentIndex = index;
  }

  private loadRuleSets(): void {
    this.ruleService.getRuleSets().subscribe((ruleSets) => {
      this.ruleSets = ruleSets;
      this.onSelect(0);
    });
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
