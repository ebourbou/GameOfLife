import { Injectable } from '@angular/core';
import { APIService, UpdateRatingMutation } from '../../API.service';

import { from, Observable } from 'rxjs';
import { RatingUtils } from './pattern-rating-util';
import { Rating } from '../model/pattern-rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private apiService: APIService) {}

  updateRating(patternRating: Rating): Promise<UpdateRatingMutation> {
    const input: any = RatingUtils.toAwsPattern(patternRating);
    delete input.id;
    return this.apiService.CreateRating(input);
  }

  getRating(id: string, userId: string): Observable<{ rating: number; userVoted: boolean }> {
    let averageRating = 0;
    let all = 1;
    let voted = false;
    return from(
      this.apiService
        .ListRatings({ rateId: { eq: id } })
        .then((value) => {
          all = value.items.length;
          value.items.forEach((rating) => {
            averageRating += rating.rating;

            if (rating.userId === userId) {
              voted = true;
              console.log(rating.userId + '===' + userId);
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
