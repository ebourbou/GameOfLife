import { Injectable } from '@angular/core';
import { APIService } from '../../API.service';

import { Pattern } from '../model/pattern';
import { from, Observable } from 'rxjs';
import { PatternUtils } from '../../designer/util/pattern-util';

@Injectable({
  providedIn: 'root',
})
export class PatternService {
  constructor(private apiService: APIService) {}

  getPatternsObservable(): Observable<Pattern[]> {
    return from(this.apiService.ListPatterns().then((result) => result.items.map((item) => PatternUtils.fromAwsPattern(item))));
  }

  getPattern(id: string): Observable<Pattern> {
    return from(this.apiService.GetPattern(id));
  }

  addPattern(pattern: Pattern): Observable<Pattern> {
    const input: any = PatternUtils.toAwsPattern(pattern);
    delete input.id;
    return from(this.apiService.CreatePattern(input));
  }

  updatePattern(pattern: Pattern): Observable<Pattern> {
    return from(this.apiService.UpdatePattern(PatternUtils.toAwsPattern(pattern)));
  }

  deletePattern(idToDelete: string): Observable<Pattern> {
    return from(this.apiService.DeletePattern({ id: idToDelete }));
  }
}
