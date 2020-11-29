import { Injectable } from '@angular/core';
import {
  APIService,
  CreatePatternMutation,
  DeletePatternMutation,
  GetPatternQuery,
  ListPatternsQuery,
  UpdatePatternMutation,
  UpdatePatternRatingMutation,
} from '../../API.service';

import { Pattern } from '../model/pattern';
import { PatternUtils } from './pattern-util';
import { from, Observable, Observer, of } from 'rxjs';
import { PatternRatingUtils } from './pattern-rating-util';
import { PatternRating } from '../model/pattern-rating';

@Injectable({
  providedIn: 'root',
})
export class PatternService {
  constructor(private apiService: APIService) {}

  async getPatterns(): Promise<ListPatternsQuery> {
    return this.apiService.ListPatterns();
  }

  getPatternsObservable(): Observable<Pattern[]> {
    return from(this.getPatterns().then((result) => result.items.map((item) => PatternUtils.fromAwsPattern(item))));
  }

  getPattern(id: string): Promise<GetPatternQuery> {
    return this.apiService.GetPattern(id);
  }

  addPattern(pattern: Pattern): Promise<CreatePatternMutation> {
    const input: any = PatternUtils.toAwsPattern(pattern);
    delete input.id;
    return this.apiService.CreatePattern(input);
  }

  updatePattern(pattern: Pattern): Promise<UpdatePatternMutation> {
    return this.apiService.UpdatePattern(PatternUtils.toAwsPattern(pattern));
  }

  deletePattern(idToDelete: string): Promise<DeletePatternMutation> {
    return this.apiService.DeletePattern({ id: idToDelete });
  }

  updatePatternRating(patternRating: PatternRating): Promise<UpdatePatternRatingMutation> {
    const input: any = PatternRatingUtils.toAwsPattern(patternRating);
    delete input.id;
    return this.apiService.CreatePatternRating(input);
  }

  getPatternRating(id: string, userId: string): Observable<{ rating: number; userVoted: boolean }> {
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
