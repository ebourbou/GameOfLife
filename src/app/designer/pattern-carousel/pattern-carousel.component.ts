import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { PatternService } from '../../shared/service/patterns.service';

@Component({
  selector: 'app-pattern-carousel',
  templateUrl: './pattern-carousel.component.html',
  styleUrls: ['./pattern-carousel.component.scss'],
})
export class PatternCarouselComponent implements OnInit {
  private currentPatternIndex = 0;

  private innerIsSelected: boolean;

  @Input()
  set isSelected(isSelected: boolean) {
    isSelected ? this.onSelect() : this.onDeselect();
  }

  get isSelected(): boolean {
    return this.innerIsSelected;
  }

  @Input()
  public patterns: Pattern[];

  @Output()
  public doPatternSelected: EventEmitter<Pattern> = new EventEmitter();

  @Output()
  public doDeSelect: EventEmitter<void> = new EventEmitter();

  @Input()
  public autoLoadPatterns: boolean;

  @Input()
  public highLightSelection: boolean;

  constructor(private patternService: PatternService) {}

  ngOnInit(): void {
    if (this.autoLoadPatterns) {
      this.loadPatterns();
    }
  }

  private onPreviousClick(): void {
    const previous = this.currentPatternIndex - 1;
    this.currentPatternIndex = previous < 0 ? this.patterns.length - 1 : previous;
    this.onDeselect();
  }

  private onNextClick(): void {
    const next = this.currentPatternIndex + 1;
    this.currentPatternIndex = next === this.patterns.length ? 0 : next;
    this.onDeselect();
  }

  onSelect(): void {
    this.innerIsSelected = true;
    this.doPatternSelected.emit(this.patterns[this.currentPatternIndex]);
  }

  onDeselect(): void {
    this.innerIsSelected = false;
    this.doDeSelect.emit();
  }

  private loadPatterns(): void {
    this.patternService.getPatternsObservable().subscribe((patterns) => {
      this.patterns = patterns;
      this.currentPatternIndex = 0;
    });
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
