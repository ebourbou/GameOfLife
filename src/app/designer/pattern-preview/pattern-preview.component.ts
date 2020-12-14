import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { Board } from '../../shared/model/Board';
import { GameUtils } from '../../shared/service/GameUtils';
import { ConwaysRuleSet } from '../../shared/service/rule/conway/ConwaysRuleSet';
import { PatternService } from '../../shared/service/patterns.service';
import { Rating } from '../../shared/model/pattern-rating';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/model/user';
import { RatingComponent } from '../../shared/rating/rating.component';
import { RatingService } from '../../shared/service/rating.service';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { NotificationService } from '../../shared/service/notification.service';
import { PatternUtils } from '../util/pattern-util';
import { APIService } from '../../API.service';
import { RatingUtils } from '../../shared/service/pattern-rating-util';
import { UserUtils } from '../../users/utils/user-utils';

@Component({
  selector: 'pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.scss'],
})
export class PatternPreviewComponent implements OnInit, OnChanges {
  @Input() ruleSet: RuleSet;

  @Input() pattern: Pattern;
  @Input() showRating = true;

  user: User;
  board: Board;
  originalPattern: string;
  rating: number;
  disabled = false;
  id: any;

  @ViewChild('rating') ratingComponent: RatingComponent;

  constructor(
    private notificationService: NotificationService,
    private ratingService: RatingService,
    private patternService: PatternService,
    private authService: AuthService
  ) {
    if (!this.ruleSet) {
      this.ruleSet = new ConwaysRuleSet();
    }
  }

  startAnimation(): void {
    this.id = setInterval(() => {
      this.play();
    }, 500);
  }

  stopAnimation(): void {
    clearInterval(this.id);
    // restore original pattern
    this.pattern.pattern = this.originalPattern;
    this.ngOnChanges(null);
  }
  play(): void {
    this.board.nextGeneration(this.ruleSet);
  }

  ngOnInit(): void {
    this.user = UserUtils.loadUserFromLocal();
  }
  async ngOnChanges(changes: SimpleChanges) {
    await this.pattern;
    await this.board;
    if (this.pattern) {
      this.originalPattern = JSON.parse(JSON.stringify(this.pattern.pattern));
      const x = this.pattern.sizeX;
      const y = this.pattern.sizeY;

      this.board = GameUtils.buildBoardWithPattern(x, y, this.pattern.pattern);
    }
  }

  onRatingChanged(rating: any): void {}
}
