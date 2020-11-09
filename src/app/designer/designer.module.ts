import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { PatternsComponent } from './pattern-list/patterns.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameModule } from '../game/game.module';
import { MatSelectModule } from '@angular/material/select';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';

@NgModule({
  imports: [SharedModule, DesignerRoutingModule, ReactiveFormsModule, GameModule, MatSelectModule],
  declarations: [PatternDetailComponent, PatternsComponent, PatternEditorComponent],
})
export class DesignerModule {}
