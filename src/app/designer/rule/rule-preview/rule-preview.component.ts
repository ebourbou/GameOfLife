import { RuleSet } from '../../../shared/model/rule/RuleSet';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../shared/model/user';
import { Rating } from '../../../shared/model/pattern-rating';
import { NotificationService } from '../../../shared/service/notification.service';
import { ConwaysRuleSet } from '../../../shared/service/rule/conway/ConwaysRuleSet';
import { RatingService } from '../../../shared/service/rating.service';
import { RatingComponent } from '../../../shared/rating/rating.component';
import { UserUtils } from '../../../users/utils/user-utils';

@Component({
  selector: 'rule-preview',
  templateUrl: './rule-preview.component.html',
  styleUrls: ['./rule-preview.component.scss'],
})
export class RulePreviewComponent implements OnChanges, OnInit {
  @Input() ruleSet: RuleSet;
  @Input() rating: number;

  user: User;
  disabled = false;
  @ViewChild('rating') ratingComponent: RatingComponent;

  constructor(private notificationService: NotificationService, private ratingService: RatingService) {
    // this.ruleSet = new ConwaysRuleSet();
  }

  ngOnInit() {
    this.user = UserUtils.loadUserFromLocal();
  }

  async ngOnChanges(changes: SimpleChanges) {
    /*  await this.ruleSet;

      this.disabled = false;
      this.ratingService.getRating(this.ruleSet.id, this.user.id).subscribe((value) => {
        this.rating = value.rating;
        this.disabled = value.userVoted;

        if (this.ratingComponent) {
          this.ratingComponent.setRating(this.rating);
          this.ratingComponent.setDisabled(this.disabled);
        }
      });*/
  }

  onRatingChanged(rating: any): void {
    this.rating = rating;
    /*
        if (!this.disabled) {
          const ratingUpdate: Rating = {
            id: '',
            rating: this.rating,
            userId: this.user.id,
            rateId: this.ruleSet.id,
            comment: 'n/a',
          };
          this.ratingService
            .updateRating(ratingUpdate)
            .then((value) => this.notificationService.info('Rating wurde gespeichert'))
            .catch((reason) => {
              this.notificationService.error('Fehler beim Rating speichern: ' + reason);
            });
          this.disabled = true;
        }*/
  }
}
