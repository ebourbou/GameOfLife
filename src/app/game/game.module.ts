import { NgModule } from '@angular/core';
import { GameComponent } from './container/game.component';
import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';
import { GameRoutingModule } from './game-routing.module';
import { StatisticModule } from '../statistic/statistic.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as gameStore from './state/game.reducer';
import { GameEffects } from './state/game.effects';
import { DesignerModule } from '../designer/designer.module';
import { MatRippleModule } from '@angular/material/core';
import { StepperComponent } from './stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BoardStepComponent } from './stepper/board-step/board-step.component';
import { CellStepComponent } from './stepper/cell-step/cell-step.component';
import { RuleStepComponent } from './stepper/rule-step/rule-step.component';
import { PlayStepComponent } from './stepper/play-step/play-step.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SaveStepComponent } from './stepper/save-step/save-step.component';
import { GametimeComponent } from './gametime/gametime.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    ControlsComponent,
    StepperComponent,
    BoardStepComponent,
    CellStepComponent,
    RuleStepComponent,
    PlayStepComponent,
    SaveStepComponent,
    GametimeComponent,
  ],
  imports: [
    GameRoutingModule,
    SharedModule,
    StatisticModule,
    StoreModule.forFeature(gameStore.gameFeatureKey, gameStore.gameActionReducer),
    EffectsModule.forFeature([GameEffects]),
    MatRippleModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    DesignerModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [BoardComponent],
})
export class GameModule {}
