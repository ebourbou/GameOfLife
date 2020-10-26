import { Injectable } from "@angular/core";
import { GameModule } from "../../game/game.module";
import { from, Observable, of } from "rxjs";
import { Controls } from "../../game/model/Controls";

@Injectable({
  providedIn: "root",
})
export class DefaultsService {
  constructor() {}

  public defaultControls(): Controls {
    return new Controls(100, 40, 500, 0);
  }
}
