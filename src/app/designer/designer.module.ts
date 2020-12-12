import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { PatternsComponent } from './pattern-list/patterns.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';
import { PatternPreviewComponent } from './pattern-preview/pattern-preview.component';
import { RuleListComponent } from './rule/rule-list/rule-list.component';
import { RuleDetailComponent } from './rule/rule-detail/rule-detail.component';
import { PatternCarouselComponent } from './pattern-carousel/pattern-carousel.component';

@NgModule({
  imports: [SharedModule, DesignerRoutingModule, ReactiveFormsModule],
  declarations: [
    PatternDetailComponent,
    PatternsComponent,
    PatternEditorComponent,
    PatternPreviewComponent,
    RuleListComponent,
    RuleDetailComponent,
    PatternCarouselComponent,
  ],
  exports: [PatternPreviewComponent, PatternCarouselComponent],
})
export class DesignerModule {}
