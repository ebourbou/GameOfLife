import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GenerationStatistic } from '../../statistic/game-statistic/GenerationStatistic';
import { Game } from '../model/Game';
import { DefaultsService } from '../../shared/service/defaults.service';
import { Store } from '@ngrx/store';
import {
  newGame,
  newDefaultGame,
  changeSpeed,
  changeGenerations,
  startGame,
  nextGeneration,
  nextGenerationSuccess,
  startGameSuccess,
  endGame,
  endGameSuccess,
  loadPatterns,
} from '../state/game.actions';
import { Observable } from 'rxjs';
import { GameState } from '../state/game.reducer';
import { selectAllPatterns, selectControls, selectGame, selectGameStatistic, selectGenerationStatistic } from '../state/game.selectors';
import { Controls } from '../model/Controls';
import { take } from 'rxjs/operators';
import { GameStatistic } from '../../statistic/game-statistic/GameStatistic';
import { Pattern } from '../../shared/model/pattern';

@Component({
  selector: 'app-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public game$: Observable<Game>;
  public controls$: Observable<Controls>;
  public generationStatistic$: Observable<GenerationStatistic>;
  public gameStatistic$: Observable<GameStatistic>;
  public allPatterns$: Observable<Pattern[]>;

  constructor(private defaults: DefaultsService, private store: Store<GameState>) {
    this.store.dispatch(newDefaultGame());
    this.store.dispatch(loadPatterns());
    this.game$ = this.store.select(selectGame);
    this.controls$ = this.store.select(selectControls);
    this.generationStatistic$ = this.store.select(selectGenerationStatistic);
    this.gameStatistic$ = this.store.select(selectGameStatistic);
    this.allPatterns$ = this.store.select(selectAllPatterns);
  }

  ngOnInit(): void {}

  async onResize(size: any): Promise<void> {
    const controls = await this.getControls();
    this.store.dispatch(newGame({ controls: { ...controls, xAxisSize: size.x, yAxisSize: size.y } }));
  }

  // fixme Die Effects sollten selber auf den Store zugreifen. Siehe https://ngrx.io/guide/effects ganz unten.
  // und auch hier. punkt 4: https://indepth.dev/start-using-ngrx-effects-for-this/
  private async getControls(): Promise<Controls> {
    return this.controls$.pipe((controls) => controls, take(1)).toPromise();
  }

  // fixme Das alles sollte ein Effect sein.
  async onPlay(): Promise<void> {
    const gameStartTime = Date.now();
    this.store.dispatch(startGame());
    this.store.dispatch(startGameSuccess({ gameStartTime }));
    const generationControls = await this.getControls();
    for (let currentGeneration = 0; currentGeneration < generationControls.generations; currentGeneration++) {
      const generationStartTime = Date.now();
      this.store.dispatch(nextGeneration({ currentGeneration }));
      const speedControls = await this.getControls();
      await new Promise((r) => setTimeout(r, speedControls.speed));
      this.store.dispatch(nextGenerationSuccess({ gameStartTime, generationStartTime, currentGeneration }));
    }
    this.store.dispatch(endGame());
    this.store.dispatch(endGameSuccess());
  }

  onChangeSpeed(speed: number): void {
    this.store.dispatch(changeSpeed({ speed }));
  }

  async onChangeGenerations(generations: number): Promise<void> {
    this.store.dispatch(changeGenerations({ generations }));
  }
}
