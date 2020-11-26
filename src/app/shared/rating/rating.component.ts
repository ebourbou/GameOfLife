import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private snackBarService: MatSnackBar) {}

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number): boolean {
    if (!this.disabled) {
      this.ratingUpdated.emit('' + rating);
      this.disabled = true;

      this.snackBarService.open('Bewertung wurde gespeichert', '', {
        duration: 1500,
      });
    } else {
      this.snackBarService.open('Schon abgestimmt', '', {
        duration: 1500,
      });
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
}
