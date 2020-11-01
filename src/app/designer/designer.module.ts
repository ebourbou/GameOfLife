import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { PatternsComponent } from './pattern-list/patterns.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Board } from '../game/model/Board';
import { BoardComponent } from '../game/board/board.component';
import { GameModule } from '../game/game.module';


@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatSelectModule,
    GameModule
  ],
  declarations: [
    PatternDetailComponent,
    PatternsComponent
  ]
})
export class DesignerModule {}
