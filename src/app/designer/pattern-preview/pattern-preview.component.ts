import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { Board } from '../../shared/model/Board';
import { GameUtils } from '../../shared/service/GameUtils';
import { ConwaysRuleSet } from '../../shared/service/rule/conway/ConwaysRuleSet';
import { PatternService } from '../../shared/service/patterns.service';
import { PatternRating } from '../../shared/model/pattern-rating';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/model/user';
import { PatternUtils } from '../util/pattern-util';
import { PatternEditorComponent } from '../pattern-editor/pattern-editor.component';
import { RatingComponent } from '../../shared/rating/rating.component';

@Component({
  selector: 'pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.scss'],
})
export class PatternPreviewComponent implements OnInit, OnChanges {
  @Input() pattern: Pattern;
  user: User;
  board: Board;
  originalPattern: string;
  rating: number;
  disabled: boolean = false;
  id: any;

  @ViewChild('rating') ratingComponent: RatingComponent;

  constructor(private patternService: PatternService, private authService: AuthService) {}

  startAnimation(): void {
    this.id = setInterval(() => {
      this.play();
    }, 500);
  }

  stopAnimation(): void {
    clearInterval(this.id);
    // restore original pattern
    this.pattern.pattern = this.originalPattern;
    console.log('on change');
    this.ngOnChanges(null);
  }
  play(): void {
    this.board.nextGeneration(new ConwaysRuleSet());
  }

  async ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
  async ngOnChanges(changes: SimpleChanges) {
    await this.user;
    await this.pattern;
    await this.board;

    if (this.pattern) {
      this.disabled = false;
      this.patternService.getPatternRating(this.pattern.id, this.user.id).subscribe((value) => {
        this.rating = value.rating;
        this.disabled = value.userVoted;

        this.ratingComponent.setRating(this.rating);
        this.ratingComponent.setDisabled(this.disabled);
      });

      this.originalPattern = JSON.parse(JSON.stringify(this.pattern.pattern));
      const x = this.pattern.sizeX;
      const y = this.pattern.sizeY;

      this.board = GameUtils.buildBoardWithPattern(x, y, this.pattern.pattern);
    }
  }

  onRatingChanged(rating: any): void {
    console.log(rating);
    this.rating = rating;

    if (!this.disabled) {
      const patternRating: PatternRating = {
        id: '',
        rating: this.rating,
        userId: this.user.id,
        patternId: this.pattern.id,
        comment: 'n/a',
      };
      console.log('Call save rating' + JSON.stringify(patternRating) + ' ' + new Date());
      this.patternService
        .updatePatternRating(patternRating)
        .then((value) => console.log(value))
        .catch((reason) => {
          console.log(reason);
        });
      this.disabled = true;
    }
  }
}
