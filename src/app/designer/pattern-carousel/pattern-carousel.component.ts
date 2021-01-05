import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { PatternService } from '../../shared/service/patterns.service';

@Component({
  selector: 'app-pattern-carousel',
  templateUrl: './pattern-carousel.component.html',
  styleUrls: ['./pattern-carousel.component.scss'],
})
export class PatternCarouselComponent implements OnInit {
  noOfPatternsVisible = 6;

  @Input()
  set visiblePatterns(patterns: number) {
    this.noOfPatternsVisible = patterns;
    this.computeIndicesAndShiftToCurrentPatternIndex();
  }

  get visiblePatterns(): number {
    return this.noOfPatternsVisible;
  }

  public currentPatternIndex = 0;

  selected = false;

  @Input()
  set isSelected(isSelected: boolean) {
    if (isSelected) {
      this.onSelect(this.currentPatternIndex);
    } else {
      this.onDeselect();
    }
    this.selected = isSelected;
  }

  get isSelected(): boolean {
    return this.selected;
  }

  @Input()
  public patterns: Pattern[];

  @Input()
  public showRating: boolean;

  @Output()
  public doPatternSelected: EventEmitter<Pattern> = new EventEmitter();

  @Output()
  public doDeSelect: EventEmitter<void> = new EventEmitter();

  public indices: Array<number> = new Array<number>();

  constructor(private patternService: PatternService) {}

  ngOnInit(): void {
    this.computeIndicesAndShiftToCurrentPatternIndex();
  }

  private computeIndicesAndShiftToCurrentPatternIndex(): void {
    this.indices = new Array<number>();
    for (let i = 0; i < this.visiblePatterns; i++) {
      this.indices.push(i);
    }
    const originalPatternIndex = this.currentPatternIndex;
    for (let currentIndex = 0; currentIndex < originalPatternIndex; currentIndex++) {
      this.onNextClick();
    }
  }

  onPreviousClick(): void {
    this.indices[0] === 0 ? this.indices.unshift(this.patterns.length - 1) : this.indices.unshift(this.indices[0] - 1);
    this.indices.pop();
    if (this.indices.length === 1) {
      this.onSelect(this.indices[0]);
    }
  }

  onNextClick(): void {
    this.indices[this.visiblePatterns - 1] === this.patterns.length - 1
      ? this.indices.push(0)
      : this.indices.push(this.indices[this.visiblePatterns - 1] + 1);
    this.indices.shift();
    if (this.indices.length === 1) {
      this.onSelect(this.indices[0]);
    }
  }

  onSelect(index: number): void {
    this.doPatternSelected.emit(this.patterns[index]);
    this.currentPatternIndex = index;
  }

  onDeselect(): void {
    this.doDeSelect.emit();
  }
}
