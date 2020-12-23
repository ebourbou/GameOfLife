import { NgModule } from '@angular/core';
import { GameComponent } from './container/game.component';
import { BoardComponent } from './board/board.component';
import { GameRoutingModule } from './game-routing.module';
import { StatisticModule } from '../statistic/statistic.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as gameStore from './state/game.reducer';
import { GameEffects } from './state/game.effects';
import { DesignerModule } from '../designer/designer.module';
import { StepperComponent } from './stepper/stepper.component';
import { BoardStepComponent } from './stepper/board-step/board-step.component';
import { CellStepComponent } from './stepper/cell-step/cell-step.component';
import { RuleStepComponent } from './stepper/rule-step/rule-step.component';
import { PlayStepComponent } from './stepper/play-step/play-step.component';
import { SaveStepComponent } from './stepper/save-step/save-step.component';
import { GametimeComponent } from './gametime/gametime.component';
import { AnalysisStepComponent } from './stepper/analysis-step/analysis-step.component';
import { GameStatisticComponent } from './game-statistic/game-statistic.component';
import { ToMeasureSeriesGroupedPipe } from './game-statistic/to-measure-series-grouped-pipe';
import { LastGenerationToMeasurePipe } from './game-statistic/last-generation-to-measure.pipe';
import { LastGenerationToPercentagePipe } from './game-statistic/last-generation-to-percentage.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DivGamePreviewComponent } from './preview/game-preview/div-game-preview.component';
import { GamePreviewComponent } from './preview/game.preview.component';
import { GameCarouselComponent } from './game-carousel/game-carousel.component';
import { LoginComponent } from '../auth/login/login.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    StepperComponent,
    BoardStepComponent,
    CellStepComponent,
    RuleStepComponent,
    PlayStepComponent,
    SaveStepComponent,
    GametimeComponent,
    AnalysisStepComponent,
    GameStatisticComponent,
    ToMeasureSeriesGroupedPipe,
    LastGenerationToMeasurePipe,
    LastGenerationToPercentagePipe,
    DivGamePreviewComponent,
    GamePreviewComponent,
    GameCarouselComponent,
  ],
  imports: [
    GameRoutingModule,
    SharedModule,
    StatisticModule,
    StoreModule.forFeature(gameStore.gameFeatureKey, gameStore.gameActionReducer),
    EffectsModule.forFeature([GameEffects]),
    DesignerModule,
    NgxChartsModule,
    DragDropModule,
  ],
  exports: [BoardComponent, DivGamePreviewComponent, GamePreviewComponent, GameCarouselComponent],

  entryComponents: [LoginComponent],
})
export class GameModule {}
