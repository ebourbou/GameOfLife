import { NgModule } from '@angular/core';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { PatternsComponent } from './pattern-list/patterns.component';
import { DesignerRoutingModule } from './designer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatternEditorComponent } from './pattern-editor/pattern-editor.component';
import { PatternPreviewComponent } from './pattern-preview/pattern-preview.component';
import { RuleListComponent } from './rule/rule-list/rule-list.component';
import { RuleDetailComponent } from './rule/rule-detail/rule-detail.component';
import { PatternCarouselComponent } from './pattern-carousel/pattern-carousel.component';
import { RuleCarouselComponent } from './rule-carousel/rule-carousel.component';
import { RulePreviewComponent } from './rule/rule-preview/rule-preview.component';
import { RuleDisplayComponent } from './rule/rule-preview/rule-display.component';

@NgModule({
  imports: [SharedModule, DesignerRoutingModule],
  declarations: [
    PatternDetailComponent,
    PatternsComponent,
    PatternEditorComponent,
    PatternPreviewComponent,
    RuleListComponent,
    RuleDetailComponent,
    RulePreviewComponent,
    RuleDisplayComponent,
    PatternCarouselComponent,
    RuleCarouselComponent,
  ],
  providers: [],
  exports: [PatternPreviewComponent, PatternCarouselComponent, RuleCarouselComponent, RulePreviewComponent],
})
export class DesignerModule {}
