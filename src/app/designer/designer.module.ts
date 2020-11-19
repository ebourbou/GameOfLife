import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { PatternsComponent } from './pattern-list/patterns.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameModule } from '../game/game.module';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';
import { PatternPreviewComponent } from './pattern-preview/pattern-preview.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [SharedModule, DesignerRoutingModule, ReactiveFormsModule, MatGridListModule, MatSlideToggleModule],
  declarations: [PatternDetailComponent, PatternsComponent, PatternEditorComponent, PatternPreviewComponent],
  exports: [PatternPreviewComponent],
})
export class DesignerModule {}
