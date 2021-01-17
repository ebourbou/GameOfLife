import { Injectable } from '@angular/core';
import { UpdateRatingMutation } from '../../API.service';

import { Rating } from '../model/pattern-rating';

@Injectable({
  providedIn: 'root',
})
export class RatingServiceMock {
  // rateId => (userId,rating)
  private ratings = new Map<string, Map<string, number>>();

  constructor() {}

  createRating(rating: Rating): Promise<UpdateRatingMutation> {
    if (this.ratings.has(rating.rateId)) {
      // check if user voted
      if (!this.ratings.get(rating.rateId).has(rating.userId)) {
        this.ratings.get(rating.rateId).set(rating.userId, rating.rating);
      }
    } else {
      // add new
      const newEntry = new Map<string, number>();
      newEntry.set(rating.userId, rating.rating);
      this.ratings.set(rating.rateId, newEntry);
    }
    return new Promise<UpdateRatingMutation>(() => true);
  }

  getRating(userId: string, ratingId: string): Promise<{ rating: number; userVoted: boolean; voteCount: number }> {
    let rating = 0;
    let all = 0;
    let voted = false;

    this.ratings.forEach((value, key) => {
      if (key === ratingId) {
        value.forEach((rateNumber, uId) => {
          rating += rateNumber;
          all++;
          if (userId === uId) {
            voted = true;
          }
        });
      }
    });

    return new Promise(() => ({ rating: rating / all, userVoted: voted, voteCount: all }));
  }
}
