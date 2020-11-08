import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatternService } from '../../shared/service/patterns.service';
import * as patternActions from './patterns.actions';

@Injectable()
export class PatternEffects {
  constructor(private actions$: Actions, private patternService: PatternService) {}

  /* loadPatterns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patternActions.loadAllPatterns),
      switchMap(action =>
        this.patternService.getPatterns().pipe(
          map(patterns => patternActions.loadAllPatternsFinished({ payload: patterns })),
          catchError(error => of(error))
        )
      )
    )
  );

  loadSinglePattern$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patternActions.loadSinglePattern),
      map(action => action.payload),
      switchMap(payload =>
        this.patternService.getPattern(payload).pipe(
          map(pattern => patternActions.loadSinglePatternFinished({ payload: pattern })),
          catchError(error => of(error))
        )
      )
    )
  );
  */

  /*addPattern$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patternActions.addPattern),
      map(action => action.payload),
      switchMap(payload =>
        this.patternService.addPattern(payload).pipe(
          map(pattern => patternActions.addPatternFinished({ payload: pattern })),
          catchError(error => of(error))
        )
      )
    )
  );

  deletePattern$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patternActions.deletePattern),
      map(action => action.payload),
      switchMap(payload =>
        this.patternService.deletePattern(payload.id).pipe(
          map(_ => patternActions.deletePatternFinished({ payload })),
          catchError(error => of(error))
        )
      )
    )
  );*/
}
