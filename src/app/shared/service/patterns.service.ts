import { Injectable } from '@angular/core';
import {
  APIService,
  CreatePatternMutation,
  DeletePatternMutation,
  GetPatternQuery,
  GetPatternRatingQuery,
  ListPatternRatingsQuery,
  ListPatternsQuery,
  UpdatePatternMutation,
} from '../../API.service';

import { Pattern } from '../model/pattern';
import { PatternUtils } from './pattern-util';
import { from, Observable } from 'rxjs';
import { PatternRating } from '../model/pattern-rating';
import { PatternRatingUtils } from './pattern-rating-util';

@Injectable({
  providedIn: 'root',
})
export class PatternService {
  constructor(private api: APIService) {}

  async getPatterns(): Promise<ListPatternsQuery> {
    return this.api.ListPatterns();
  }

  getPatternsObservable(): Observable<Pattern[]> {
    return from(this.getPatterns().then((result) => result.items.map((item) => PatternUtils.fromAwsPattern(item))));
  }

  getPattern(id: string): Promise<GetPatternQuery> {
    return this.api.GetPattern(id);
  }

  addPattern(pattern: Pattern): Promise<CreatePatternMutation> {
    const input: any = PatternUtils.toAwsPattern(pattern);
    delete input.id;
    return this.api.CreatePattern(input);
  }

  updatePattern(pattern: Pattern): Promise<UpdatePatternMutation> {
    return this.api.UpdatePattern(PatternUtils.toAwsPattern(pattern));
  }

  deletePattern(idToDelete: string): Promise<DeletePatternMutation> {
    return this.api.DeletePattern({ id: idToDelete });
  }

  /* getPatternRating(patternId: string): Promise<ListPatternRatingsQuery> {
     return this.api.ListPatternRatings(); // { patternId: { eq: patternId } }
   }

   updatePatternRating(userId: string) {
     const input: any = PatternRatingUtils.toAwsPattern(patternRating);
     return this.api.UpdatePatternRating(PatternRatingUtils.toAwsPattern(rating));
   }*/
}
