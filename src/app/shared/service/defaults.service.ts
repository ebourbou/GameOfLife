import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Controls } from '../../game/model/Controls';

@Injectable({
  providedIn: 'root',
})
export class DefaultsService {
  constructor() {}

  public defaultControls(): Observable<Controls> {
    return of(new Controls(100, 40, 200, 0));
  }
}
