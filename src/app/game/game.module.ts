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
import { GamePreviewComponent } from './preview/game.preview.component';

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
    GamePreviewComponent,
  ],
  imports: [
    GameRoutingModule,
    SharedModule,
    StatisticModule,
    StoreModule.forFeature(gameStore.gameFeatureKey, gameStore.gameActionReducer),
    EffectsModule.forFeature([GameEffects]),
    DesignerModule,
  ],
  exports: [BoardComponent],
})
export class GameModule {}
