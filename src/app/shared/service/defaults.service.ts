import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Controls } from '../../game/model/controls';

@Injectable({
  providedIn: 'root',
})
export class DefaultsService {
  constructor() {}

  public defaultControls(): Observable<Controls> {
    return of(new Controls(100, 50, 200, 0));
  }

  public defaultSizes(): Observable<Map<string, { x: number; y: number }>> {
    const map = new Map<string, { x: number; y: number }>();
    map.set('small', { x: 50, y: 30 });
    map.set('medium', { x: 100, y: 50 });
    map.set('large', { x: 200, y: 100 });
    return of(map);
  }
}
