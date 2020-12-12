import { Injectable } from '@angular/core';
import { APIService, UpdatePatternRatingMutation } from '../../API.service';

import { from, Observable, Observer, of } from 'rxjs';
import { PatternRatingUtils } from './pattern-rating-util';
import { PatternRating } from '../model/pattern-rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private apiService: APIService) {}

  updateRating(patternRating: PatternRating): Promise<UpdatePatternRatingMutation> {
    const input: any = PatternRatingUtils.toAwsPattern(patternRating);
    delete input.id;
    return this.apiService.CreatePatternRating(input);
  }

  getRating(id: string, userId: string): Observable<{ rating: number; userVoted: boolean }> {
    let averageRating = 0;
    let all = 1;
    let voted = false;
    return from(
      this.apiService
        .ListPatternRatings({ patternId: { eq: id } })
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
