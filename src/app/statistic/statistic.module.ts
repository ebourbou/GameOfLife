import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ScoreTagComponent } from './score-tag/score-tag.component';
import { ScoreMedalComponent } from './score-medal/score-medal.component';
import { ScoreComponent } from './score/score.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [ScoreTagComponent, ScoreMedalComponent, ScoreComponent],
  imports: [SharedModule, MatChipsModule],
  exports: [ScoreMedalComponent, ScoreTagComponent, ScoreComponent],
})
export class StatisticModule {}
