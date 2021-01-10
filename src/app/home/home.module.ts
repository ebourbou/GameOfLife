import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SlideExplanationRulesComponent } from './slides/rules-slide.component';
import { SlideReferencesComponent } from './slides/reference-slide.component';
import { HomeComponent } from './home.component';
import { DesignerModule } from '../designer/designer.module';
import { GameModule } from '../game/game.module';
import { SlideTeaserComponent } from './slides/teaser-slide.component';

@NgModule({
  declarations: [SlideExplanationRulesComponent, SlideReferencesComponent, SlideTeaserComponent, HomeComponent],
  imports: [SharedModule, DesignerModule, GameModule],
  exports: [],
})
export class HomeModule {}
