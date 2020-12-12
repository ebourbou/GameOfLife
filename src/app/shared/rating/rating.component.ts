import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'mat-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() starCount = 5;
  @Output() ratingUpdated = new EventEmitter();
  ratingArr = [];
  disabled: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number): boolean {
    if (!this.disabled) {
      console.log('Emit ' + rating);
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
