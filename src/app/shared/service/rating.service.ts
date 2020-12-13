import { Injectable } from '@angular/core';
import { APIService, UpdateRatingMutation } from '../../API.service';

import { from, Observable, of } from 'rxjs';
import { RatingUtils } from './pattern-rating-util';
import { Rating } from '../model/pattern-rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private apiService: APIService) {}

  createRating(rating: Rating): Promise<UpdateRatingMutation> {
    const input: any = RatingUtils.toAwsPattern(rating);
    delete input.id;
    return this.apiService.CreateRating(input);
  }

  getRating(rateId: string, userId: string): Observable<{ rating: number; userVoted: boolean }> {
    let averageRating = 0;
    let all = 1;
    let voted = false;
    return from(
      this.apiService
        .ListRatings({ rateId: { eq: rateId } })
        .then((value) => {
          console.log(JSON.stringify(value));
          all = Math.max(1, value.items.length);
          value.items.forEach((rating) => {
            averageRating += rating.rating;

            if (rating.userId === userId) {
              voted = true;
            }
          });
          return { rating: averageRating / all, userVoted: voted };
        })
        .catch((reason) => {
          console.log(reason);
          return { rating: 0, userVoted: false };
        })
    );
  }
}
