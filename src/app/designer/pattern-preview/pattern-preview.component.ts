import { ApplicationRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { Board } from '../../shared/model/board';

import { ConwaysRuleSet } from '../../shared/service/rule/conway/conways-rule-set';
import { PatternService } from '../../shared/service/patterns.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/model/user';
import { RatingComponent } from '../../shared/rating/rating.component';
import { RatingService } from '../../shared/service/rating.service';
import { Ruleset } from '../../shared/model/rule/ruleset';
import { NotificationService } from '../../shared/service/notification.service';
import { UserUtils } from '../../users/utils/user-utils';
import { GameUtils } from '../../shared/service/game-utils';

@Component({
  selector: 'pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.scss'],
})
export class PatternPreviewComponent implements OnInit, OnChanges {
  @Input() ruleSet: Ruleset;

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
    private authService: AuthService,
    private appRef: ApplicationRef
  ) {
    if (!this.ruleSet) {
      this.ruleSet = new ConwaysRuleSet();
    }
  }

  startAnimation(): void {
    if (this.id == null) {
      this.id = setInterval(() => {
        this.play();
      }, 500);
    }
  }

  stopAnimation(): void {
    clearInterval(this.id);
    // restore original pattern
    this.pattern.pattern = this.originalPattern;
    this.ngOnChanges(null);
    this.id = null;
  }
  play(): void {
    this.board.nextGeneration(this.ruleSet);
    this.appRef.tick();
  }

  ngOnInit(): void {
    this.user = UserUtils.loadUserFromLocal();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    await this.pattern;
    await this.board;
    if (this.pattern) {
      this.originalPattern = JSON.parse(JSON.stringify(this.pattern.pattern));
      const x = this.pattern.sizeX;
      const y = this.pattern.sizeY;

      this.board = GameUtils.buildBoardWithPattern(x, y, this.pattern.pattern);
    }
  }
}
