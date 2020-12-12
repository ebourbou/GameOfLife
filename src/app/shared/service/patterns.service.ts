import { Injectable } from '@angular/core';
import {
  APIService,
  CreatePatternMutation,
  DeletePatternMutation,
  GetPatternQuery,
  ListPatternsQuery,
  UpdatePatternMutation,
} from '../../API.service';

import { Pattern } from '../model/pattern';
import { from, Observable } from 'rxjs';
import { PatternUtils } from '../../designer/util/pattern-util';

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
}
