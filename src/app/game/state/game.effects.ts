import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, delay, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as GameActions from './game.actions';
import { DefaultsService } from '../../shared/service/defaults.service';
import { Game } from '../model/Game';
import { GameUtils } from '../../shared/service/GameUtils';
import { Controls } from '../model/Controls';
import { SnackbarService } from '../../shared/service/snackbar.service';
import { AbstractRuleService } from '../../shared/service/rule/abstract-rule.service';
import { PatternService } from '../../shared/service/patterns.service';
import { GameService } from '../../shared/service/game.service';

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
      switchMap((actionPayload) => of(GameActions.newGameSuccess(this.newGame(actionPayload.controls))).pipe(delay(2000)))
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

  allRuleSets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadRuleSets),
      concatMap(() =>
        this.ruleService.getRuleSets().pipe(
          map((allRuleSets) => GameActions.loadRuleSetsSuccess({ allRuleSets })),
          catchError((error) => of(GameActions.errorAction({ errors: error.errors.map((e) => e.message) })))
        )
      )
    );
  });

  saveGame = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.addGame),
      concatMap((payload) =>
        this.gameService.addGame(payload.game).pipe(
          map((game) => GameActions.saveGameSuccess({ id: game.id })),
          catchError((error) => of(GameActions.errorAction({ errors: [payload, error] })))
        )
      )
    );
  });

  applyGame = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.applyGame),
      concatMap((payload) =>
        this.gameService.getGame(payload.id).pipe(
          map((game) => GameActions.applyGameSuccess({ game })),
          catchError((error) => of(GameActions.errorAction({ errors: [payload, error] })))
        )
      )
    );
  });

  loadGames = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadGames),
      concatMap((payload) =>
        this.gameService.getAllGames().pipe(
          map((games) => GameActions.loadGamesSuccess({ games })),
          catchError((error) => of(GameActions.errorAction({ errors: [payload, error] })))
        )
      )
    );
  });

  startAnalysis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.startAnalysis),
      concatMap(() => of(GameActions.startAnalysisSuccess()))
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
    private patternService: PatternService,
    private ruleService: AbstractRuleService,
    private gameService: GameService,
    private snackBar: SnackbarService
  ) {}

  private newGame(controls: Controls): any {
    const game = new Game(GameUtils.build(controls.xAxisSize, controls.yAxisSize), controls.generations);
    return { game, controls };
  }
}
