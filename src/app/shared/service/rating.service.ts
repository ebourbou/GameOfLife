import { Injectable } from '@angular/core';
import { APIService, UpdateRatingMutation } from '../../API.service';

import { throwError } from 'rxjs';
import { Rating } from '../model/pattern-rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private apiService: APIService) {}

  private static toAwsPattern(rating): Rating {
    let patRate: any;
    patRate = {
      id: rating.id,
      userId: rating.userId,
      rateId: rating.rateId,
      comment: rating.comment,
      rating: rating.rating,
    };
    return patRate;
  }

  createRating(rating: Rating): Promise<UpdateRatingMutation> {
    const input: any = RatingService.toAwsPattern(rating);
    delete input.id;
    return this.apiService.CreateRating(input);
  }

  getRating(userId: string, ratingId: string): Promise<{ rating: number; userVoted: boolean; voteCount: number }> {
    if (!userId || !ratingId) {
      throwError('Benutzer oder rating id nicht gesetzt');
    }
    let averageRating = 0;
    let all = 1;
    let voted = false;
    return this.apiService.ListRatings({ rateId: { eq: ratingId } }).then((value) => {
      all = Math.max(1, value.items.length);
      value.items.forEach((rating) => {
        averageRating += rating.rating;
        if (rating.userId === userId) {
          voted = true;
        }
      });
      return { rating: averageRating / all, userVoted: voted, voteCount: all };
    });
  }
}
