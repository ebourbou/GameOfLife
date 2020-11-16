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
import { PatternUtils } from './pattern-util';
import { from, Observable } from 'rxjs';

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
}
