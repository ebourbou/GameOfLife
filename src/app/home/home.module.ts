import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SlideExplanationRules } from './slides/rules-slide.component';
import { SlideReferences } from './slides/reference-slide.component';
import { HomeComponent } from './home.component';
import { DesignerModule } from '../designer/designer.module';
import { GameModule } from '../game/game.module';
import { SlideTeaser } from './slides/teaser-slide.component';

@NgModule({
  declarations: [SlideExplanationRules, SlideReferences, SlideTeaser, HomeComponent],
  imports: [SharedModule, DesignerModule, GameModule],
  exports: [],
})
export class HomeModule {}
