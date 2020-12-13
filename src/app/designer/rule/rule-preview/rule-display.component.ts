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
  selector: 'rule-display',
  templateUrl: './rule-display.component.html',
  styleUrls: ['./rule-display.component.scss'],
})
export class RuleDisplayComponent implements OnInit {
  @Input() rule: string;

  birth: Array<boolean> = [false, false, false, false, false, false, false, false];
  death: Array<boolean> = [false, false, false, false, false, false, false, false];

  ngOnInit(): void {
    // parse BS rule B3/S23

    this.rule
      .split('/')[0]
      .slice(1)
      .split('')
      .map((a) => (this.birth[Number(a) - 1] = true));
    this.rule
      .split('/')[1]
      .slice(1)
      .split('')
      .map((a) => (this.death[Number(a) - 1] = true));
  }
}
