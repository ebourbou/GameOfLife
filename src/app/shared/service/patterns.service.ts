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

@Injectable({
  providedIn: 'root',
})
export class PatternService {
  constructor(private apiService: APIService) {}

  async getPatterns(): Promise<ListPatternsQuery> {
    return this.apiService.ListPatterns();
  }

  getPatternsObservable(): Observable<Pattern[]> {
    return from(this.getPatterns().then((result) => result.items.map((item) => this.fromAwsPattern(item))));
  }

  getPattern(id: string): Promise<GetPatternQuery> {
    return this.apiService.GetPattern(id);
  }

  getPatternObservable(id: string): Observable<Pattern> {
    return from(this.apiService.GetPattern(id).then((result) => this.fromAwsPattern(result)));
  }

  addPattern(pattern: Pattern): Promise<CreatePatternMutation> {
    const input: any = this.toAwsPattern(pattern);
    delete input.id;
    return this.apiService.CreatePattern(input);
  }

  updatePattern(pattern: Pattern): Promise<UpdatePatternMutation> {
    return this.apiService.UpdatePattern(this.toAwsPattern(pattern));
  }

  deletePattern(idToDelete: string): Promise<DeletePatternMutation> {
    return this.apiService.DeletePattern({ id: idToDelete });
  }

  private fromAwsPattern(awsPattern): Pattern {
    let pat: Pattern;
    pat = {
      id: awsPattern.id,
      name: awsPattern.name,
      description: awsPattern.description,
      author: awsPattern.author,
      year: awsPattern.year,
      heat: awsPattern.heat,
      sizeX: awsPattern.sizeX,
      sizeY: awsPattern.sizeY,
      pattern: awsPattern.pattern,
      type: awsPattern.type,
      locked: awsPattern.locked,
    };
    return pat;
  }

  private toAwsPattern(pattern): Pattern {
    let pat: any;
    pat = {
      id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      author: pattern.author,
      year: pattern.year,
      heat: pattern.heat,
      sizeX: pattern.sizeX,
      sizeY: pattern.sizeY,
      pattern: pattern.pattern,
      type: pattern.type,
      locked: pattern.locked,
    };
    return pat;
  }
}
