import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'mat-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RatingComponent implements OnInit {
  @Input() rating;
  @Input() starCount = 5;
  @Output() ratingUpdated = new EventEmitter();

  ratingArr = [];

  constructor() {}

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number): boolean {
    this.ratingUpdated.emit('' + rating);
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
