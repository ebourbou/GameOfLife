import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { GameEffects } from "./game.effects";

describe("GameEffects", () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: GameEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(GameEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});