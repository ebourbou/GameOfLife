import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { Game } from '../model/Game';
import { DefaultsService } from '../../shared/service/defaults.service';
import { Store } from '@ngrx/store';
import {
  applyPattern,
  applyRuleSet,
  changeGenerations,
  changeSpeed,
  endGame,
  endGameSuccess,
  invertCells,
  loadPatterns,
  loadRuleSets,
  newDefaultGame,
  newGame,
  nextGeneration,
  nextGenerationSuccess,
  patternSelected,
  randomCells,
  resetCells,
  addGame,
  startGame,
  startGameSuccess,
  stepChanged,
  togglePause,
  applyGame,
  startAnalysis,
  toggleMaximize,
  switchCellState,
} from '../state/game.actions';
import { Observable } from 'rxjs';
import { GameState } from '../state/game.reducer';
import {
  selectAllGenerationStatistics,
  selectAllPatterns,
  selectAllRuleSets,
  selectControls,
  selectGame,
  selectGenerationStatistic,
  selectIsEditable,
  selectIsGameFinished,
  selectIsLoading,
  selectIsMasked,
  selectIsMaximized,
  selectIsPaused,
  selectIsReadyForAnalysis,
  selectIsReadyToRun,
  selectIsRunning,
  selectPatternSelected,
  selectScore,
} from '../state/game.selectors';
import { Controls } from '../model/Controls';
import { take } from 'rxjs/operators';
import { Pattern } from '../../shared/model/pattern';
import { Cell } from '../../shared/model/Cell';
import { StepperStep } from '../stepper/StepperStep';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { Score } from '../../statistic/service/score';
import { ActivatedRoute, Router } from '@angular/router';

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
  public allPatterns$: Observable<Pattern[]>;
  public patternSelected$: Observable<Pattern>;
  public allRuleSets$: Observable<RuleSet[]>;
  public isMasked$: Observable<boolean>;
  public isEditable$: Observable<boolean>;
  public isPaused$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isRunning$: Observable<boolean>;
  public isBoardMaximized$: Observable<boolean>;
  public isReadyToRun$: Observable<boolean>;
  public isReadyForAnalysis$: Observable<boolean>;
  public isGameFinished$: Observable<boolean>;
  public games$: Observable<Game[]>;
  public allGenerationStatistics$: Observable<GenerationStatistic[]>;
  public score$: Observable<Score>;

  constructor(private route: ActivatedRoute, private router: Router, private defaults: DefaultsService, private store: Store<GameState>) {
    this.game$ = this.store.select(selectGame);
    this.controls$ = this.store.select(selectControls);
    this.generationStatistic$ = this.store.select(selectGenerationStatistic);
    this.allPatterns$ = this.store.select(selectAllPatterns);
    this.patternSelected$ = this.store.select(selectPatternSelected);
    this.allRuleSets$ = this.store.select(selectAllRuleSets);
    this.isMasked$ = this.store.select(selectIsMasked);
    this.isEditable$ = this.store.select(selectIsEditable);
    this.isPaused$ = this.store.select(selectIsPaused);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isRunning$ = this.store.select(selectIsRunning);
    this.isBoardMaximized$ = this.store.select(selectIsMaximized);
    this.isReadyToRun$ = this.store.select(selectIsReadyToRun);
    this.isReadyForAnalysis$ = this.store.select(selectIsReadyForAnalysis);
    this.isGameFinished$ = this.store.select(selectIsGameFinished);
    this.allGenerationStatistics$ = this.store.select(selectAllGenerationStatistics);
    this.score$ = this.store.select(selectScore);
  }

  ngOnInit(): void {
    // Allows for ngOnInit to be called on routing to the same routing Component since we will never reuse a route
    this.startFromScratch();
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.onApplyGame(params.id);
      }
    });
  }

  async onResize(size: any): Promise<void> {
    const controls = await this.getControls();
    this.store.dispatch(newGame({ controls: { ...controls, xAxisSize: size.x, yAxisSize: size.y } }));
  }

  onPatternSelected(pattern: Pattern): void {
    this.store.dispatch(patternSelected({ selectedPattern: pattern }));
  }

  onApplyPattern(centerCell: Cell): void {
    this.store.dispatch(applyPattern({ row: centerCell.row, column: centerCell.column }));
  }

  // fixme Die Effects sollten selber auf den Store zugreifen. Siehe https://ngrx.io/guide/effects ganz unten.
  // und auch hier. punkt 4: https://indepth.dev/start-using-ngrx-effects-for-this/
  private async getControls(): Promise<Controls> {
    return this.controls$.pipe((controls) => controls, take(1)).toPromise();
  }

  onRuleSetSelected(ruleSet: RuleSet): void {
    this.store.dispatch(applyRuleSet({ ruleSet }));
  }

  onTogglePause(): void {
    this.store.dispatch(togglePause());
  }

  // fixme Das alles sollte ein Effect sein.
  async onPlay(): Promise<void> {
    const gameStartTime = Date.now();
    this.store.dispatch(startGame());
    this.store.dispatch(startGameSuccess());
    const controls = await this.getControls();
    for (let currentGeneration = 0; currentGeneration < controls.generations; currentGeneration++) {
      this.store.dispatch(nextGeneration({ currentGeneration }));
      const speedControls = await this.getControls();
      await new Promise((r) => setTimeout(r, speedControls.speed));
      this.store.dispatch(nextGenerationSuccess({ currentGeneration }));
    }
    this.store.dispatch(endGame());
    this.store.dispatch(endGameSuccess());
  }

  onChangeSpeed(speed: number): void {
    this.store.dispatch(changeSpeed({ speed }));
  }

  onChangeGenerations(generations: number): void {
    this.store.dispatch(changeGenerations({ generations }));
  }

  onRandomCells(): void {
    this.store.dispatch(randomCells());
  }

  onResetCells(): void {
    this.store.dispatch(resetCells());
  }

  onInvertCells(): void {
    this.store.dispatch(invertCells());
  }

  onStepChanged(step: StepperStep): void {
    this.store.dispatch(stepChanged({ step }));
  }

  onSaveGame(params: { isPublic: boolean; game: Game }): void {
    this.store.dispatch(addGame(params));
  }

  onApplyGame(id: string): void {
    this.store.dispatch(applyGame({ id }));
  }

  startFromScratch(): void {
    this.store.dispatch(newDefaultGame());
    this.store.dispatch(loadPatterns());
    this.store.dispatch(loadRuleSets());
  }

  onStartAnalysis($event): void {
    this.store.dispatch(startAnalysis({ game: $event.game, generationStatistics: $event.generationStatistics }));
  }

  onToggleMaximize(): void {
    this.store.dispatch(toggleMaximize());
  }

  onSwitchCellState($event): void {
    this.store.dispatch(switchCellState({ x: $event.column, y: $event.row }));
  }
}
