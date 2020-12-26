import { Ruleset } from '../../../shared/model/rule/ruleset';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../shared/model/user';
import { Rating } from '../../../shared/model/pattern-rating';
import { NotificationService } from '../../../shared/service/notification.service';
import { ConwaysRuleSet } from '../../../shared/service/rule/conway/conways-rule-set';
import { RatingService } from '../../../shared/service/rating.service';
import { RatingComponent } from '../../../shared/rating/rating.component';
import { UserUtils } from '../../../users/utils/user-utils';

@Component({
  selector: 'rule-preview',
  templateUrl: './rule-preview.component.html',
  styleUrls: ['./rule-preview.component.scss'],
})
export class RulePreviewComponent implements OnInit {
  @Input() ruleSet: Ruleset;
  @Input() showRating = true;

  user: User;
  disabled = false;
  @ViewChild('rating') ratingComponent: RatingComponent;

  constructor(private notificationService: NotificationService, private ratingService: RatingService) {}

  ngOnInit() {
    this.user = UserUtils.loadUserFromLocal();
  }

  onRatingChanged(rating: any): void {}
}
