import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
  selector: 'gol-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() userId: string;
  @Input() ratingId: string;

  @Output() ratingUpdated = new EventEmitter();
  ratingArr = [];
  private starCount = 5;
  disabled = false;
  voteCount = 0;
  loading = true;
  rating = 0;

  constructor(private notificationService: NotificationService, private apiService: APIService, private ratingService: RatingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadRating();
  }

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
    this.loading = true;
    this.ratingService.getRating(this.userId, this.ratingId).then((value) => {
      this.disabled = value.userVoted;
      this.rating = value.rating;
      this.voteCount = value.voteCount;
      this.loading = false;
    });
  }

  onClick(ratingSelected: number): boolean {
    if (!this.disabled) {
      this.loading = true;
      const ratingUpdate: Rating = {
        id: '',
        rating: ratingSelected,
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
      this.ratingUpdated.emit('' + ratingSelected);
      this.disabled = true;
      this.notificationService.info('Bewertung wurde gespeichert');
    } else {
      this.notificationService.info('Schon abgestimmt');
    }
    this.loading = false;
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

  tooltip(): string {
    return `Bereits abgestimmt. Insgesamt ${this.voteCount} Stimme` + (this.voteCount > 1 ? 'n' : '');
  }
}
