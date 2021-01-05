import { RuleSet } from '../../../shared/model/rule/rule-set';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/model/user';
import { NotificationService } from '../../../shared/service/notification.service';
import { RatingService } from '../../../shared/service/rating.service';
import { RatingComponent } from '../../../shared/rating/rating.component';
import { UserUtils } from '../../../users/utils/user-utils';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'rule-preview',
  templateUrl: './rule-preview.component.html',
  styleUrls: ['./rule-preview.component.scss'],
})
export class RulePreviewComponent implements OnInit {
  @Input() ruleSet: RuleSet;
  @Input() showRating = true;

  @Input()
  size: Size = Size.LARGE;

  user: User;
  disabled = false;
  @ViewChild('rating') ratingComponent: RatingComponent;

  constructor(private notificationService: NotificationService, private ratingService: RatingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}

enum Size {
  LARGE,
  SMALL,
  TINY,
}
