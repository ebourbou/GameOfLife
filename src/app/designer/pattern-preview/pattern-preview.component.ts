import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { Board } from '../../shared/model/Board';
import { GameUtils } from '../../shared/service/GameUtils';
import { ConwaysRuleSet } from '../../shared/service/rule/conway/ConwaysRuleSet';
import { PatternService } from '../../shared/service/patterns.service';
import { PatternRating } from '../../shared/model/pattern-rating';

@Component({
  selector: 'pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.scss'],
})
export class PatternPreviewComponent implements OnChanges {
  @Input() pattern: Pattern;
  board: Board = null;
  originalPattern: string;
  rating: number = 3; // TODO from DB
  disabled: boolean = false;
  id: any;

  constructor(private patternService: PatternService) {}

  startAnimation(): void {
    // this.id = setInterval(() => {
    //   this.play();
    // }, 500);
  }

  stopAnimation(): void {
    // clearInterval(this.id);
    // // restore original pattern
    // this.pattern.pattern = this.originalPattern;
    // this.ngOnChanges(null);
  }
  play(): void {
    this.board.nextGeneration(new ConwaysRuleSet());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pattern) {
      this.originalPattern = JSON.parse(JSON.stringify(this.pattern.pattern));
      const x = this.pattern.sizeX;
      const y = this.pattern.sizeY;

      this.board = GameUtils.buildBoardWithPattern(x, y, this.pattern.pattern);
    }
  }

  onRatingChanged(rating: any): void {
    console.log(rating);
    this.rating = rating;
    this.disabled = true;
    /*
    const patternRating: PatternRating = {
      comment,
    };
    this.patternService.updatePatternRating(patternRating);*/
  }
}
