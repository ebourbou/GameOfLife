import { Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../service/notification.service';
import { Rating } from '../model/pattern-rating';
import { RatingUtils } from '../service/pattern-rating-util';
import { APIService } from '../../API.service';
import { AppComponent } from '../../app.component';
import { API } from '@aws-amplify/api';
import { Observable } from 'rxjs';
import { RatingService } from '../service/rating.service';

@Component({
  selector: 'mat-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() starCount = 5;
  @Input() userId: string;
  @Input() ratingId: string;

  @Output() ratingUpdated = new EventEmitter();
  ratingArr = [];
  disabled = false;

  constructor(private notificationService: NotificationService, private apiService: APIService, private ratingService: RatingService) {}

  ngOnInit(): void {
    this.apiService.OnCreateRatingListener.subscribe((value) => {
      console.log('Detected rating change');
      this.loadRating();
    });

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.loadRating();
  }

  private loadRating(): void {
    this.ratingService.getRating(this.userId, this.ratingId).subscribe((value) => {
      const rating = value.rating;
      const disabled = value.userVoted;
      this.setRating(rating);
      this.disabled = disabled;
    });
  }

  onClick(rating: number): boolean {
    if (!this.disabled) {
      console.log('Emit ' + rating);

      const ratingUpdate: Rating = {
        id: '',
        rating: this.rating,
        userId: this.userId,
        rateId: this.ratingId,
        comment: 'n/a',
      };
      this.ratingService
        .createRating(ratingUpdate)
        .then((value) => this.notificationService.info('Rating wurde gespeichert'))
        .catch((reason) => {
          this.notificationService.error('Fehler beim Rating speichern: ' + reason);
        });
      this.ratingUpdated.emit('' + rating);
      this.disabled = true;
      this.notificationService.info('Bewertung wurde gespeichert');
    } else {
      this.notificationService.info('Schon abgestimmt');
    }
    return false;
  }

  showIcon(index: number): string {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  setRating(rating: number): void {
    this.rating = rating;
  }
}
