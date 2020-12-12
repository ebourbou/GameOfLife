import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Controls } from '../../game/model/Controls';

@Injectable({
  providedIn: 'root',
})
export class DefaultsService {
  constructor() {}

  public defaultControls(): Observable<Controls> {
    return of(new Controls(100, 40, 200, 0));
  }

  public defaultSizes(): Observable<Map<string, { x: number; y: number }>> {
    const map = new Map<string, { x: number; y: number }>();
    map.set('small', { x: 40, y: 20 });
    map.set('medium', { x: 100, y: 40 });
    map.set('large', { x: 200, y: 80 });
    return of(map);
  }
}
