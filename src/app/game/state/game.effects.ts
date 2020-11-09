import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as GameActions from './game.actions';
import { DefaultsService } from '../../shared/service/defaults.service';
import { Game } from '../model/Game';
import { GameUtils } from '../util/GameUtils';
import { ConwaysRuleSet } from '../../designer/rule/conway/ConwaysRuleSet';
import { Controls } from '../model/Controls';
import { PatternService } from '../../shared/service/patterns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameComponent } from '../container/game.component';
import { SnackbarService } from '../../shared/service/snackbar.service';
import { PatternMockService } from '../../shared/service/patterns-mock.service';

@Injectable()
export class GameEffects {
  loadDefaultGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.newDefaultGame),
      concatMap(() => this.defaults.defaultControls().pipe(map((controls) => GameActions.newGameSuccess(this.newGame(controls)))))
    );
  });
  loadNewGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.newGame),
      concatMap((actionPayload) => of(GameActions.newGameSuccess(this.newGame(actionPayload.controls))))
    );
  });
  endGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.endGame),
      concatMap(() => of(GameActions.endGameSuccess()))
    );
  });

  allPatterns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadPatterns),
      concatMap(() =>
        this.patternService.getPatternsObservable().pipe(
          map((allPatterns) => GameActions.loadPatternsSuccess({ allPatterns })),
          catchError((error) => of(GameActions.errorAction({ errors: error.errors.map((e) => e.message) })))
        )
      )
    );
  });

  onError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GameActions.errorAction),
        map((payload) => {
          this.snackBar.errors(GameActions.errorAction.type, payload.errors);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private defaults: DefaultsService,
    private patternService: PatternMockService,
    //private patternService: PatternService,
    private snackBar: SnackbarService
  ) {}

  private newGame(controls: Controls): any {
    const game = new Game(GameUtils.build(controls.xAxisSize, controls.yAxisSize), controls.generations, new ConwaysRuleSet());
    return { game, controls };
  }
}
