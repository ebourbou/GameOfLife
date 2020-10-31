import {Injectable} from '@angular/core';
import {
  APIService,
  CreatePatternInput,
  DeletePatternInput,
  ListPatternsQuery,
  ListUsersQuery,
  UpdatePatternInput
} from '../../API.service';
import {Observable, of} from 'rxjs';
import {Pattern} from '../../shared/model/pattern';
import { AmplifyService } from 'aws-amplify-angular';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  constructor(private api: APIService,
              private amplify: AmplifyService) {
  }

  getPatterns(): Observable<Pattern[]> {
    const response = new Array<Pattern>();
    this.api.ListPatterns().then(items => {
      const reply = items.items;
      items.items.map(item => {
        let pat: Pattern;
        pat = {
          id: item.id,
          name: item.name,
          description: item.description,
          author: item.author,
          year: item.year,
          heat: item.heat,
          sizeX: item.boxX,
          sizeY: item.boxY,
          pattern: item.pattern,
          type: item.type
        };
        response.push(pat);
      });
    });
    return of(response);

  }

  getPattern(id: string): Observable<Pattern> {
    let response;
    this.api.GetPattern(id).then(event => {
      response = event;
    });
    return new Observable<Pattern>(response);
  }

  addPattern(pattern: Pattern): Observable<Pattern> {
    let response;
    let input: CreatePatternInput;
    input = {
      author: pattern.author,
      boxX: pattern.sizeX,
      boxY: pattern.sizeY,
      description: pattern.description,
      heat: pattern.heat,
      name: pattern.name,
      pattern: pattern.pattern,
      type: pattern.type,
      year: pattern.year
    };
    this.api.CreatePattern(input).then(event => {
      response = event;
    });
    return new Observable<Pattern>(response);
  }

  updatePattern(pattern: Pattern): Observable<Pattern> {
    let response;
    let input: UpdatePatternInput;
    input = {
      id: pattern.id,
      author: pattern.author,
      boxX: pattern.sizeX,
      boxY: pattern.sizeY,
      description: pattern.description,
      heat: pattern.heat,
      name: pattern.name,
      pattern: pattern.pattern,
      type: pattern.type,
      year: pattern.year
    };
    this.api.UpdatePattern(input).then(event => {
      response = event;
    });
    return new Observable<Pattern>(response);
  }


  deletePattern(idToDelete: string): Observable<Pattern> {
    let response;
    let input: DeletePatternInput;
    input = {
      id: idToDelete
    };

    this.api.DeletePattern(input).then(event => {
      response = event;
    });
    return new Observable<Pattern>(response);
  }

}
