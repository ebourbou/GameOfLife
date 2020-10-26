import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap } from "rxjs/operators";
import { of } from "rxjs";
import * as GameActions from "./game.actions";
import { DefaultsService } from "../../shared/service/defaults.service";
import { Game } from "../model/Game";
import { GameUtils } from "../util/GameUtils";
import { ConwaysRuleSet } from "../../designer/rule/conway/ConwaysRuleSet";
import { Controls } from "../model/Controls";

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, private defaults: DefaultsService) {}

  loadDefaultGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.newDefaultGame),
      concatMap(() => of(GameActions.newGameSuccess(this.newGame(this.defaults.defaultControls()))))
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
      concatMap((actionPayload) => of(GameActions.endGameSuccess()))
    );
  });

  private newGame(controls: Controls): any {
    const game = new Game(
      GameUtils.build(controls.xAxisSize, controls.yAxisSize),
      controls.generations,
      new ConwaysRuleSet()
    );
    return { game, controls };
  }
}
