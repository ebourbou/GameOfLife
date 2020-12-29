import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ScoreTagComponent } from './score-tag/score-tag.component';
import { ScoreMedalComponent } from './score-medal/score-medal.component';

@NgModule({
  declarations: [ScoreTagComponent, ScoreMedalComponent],
  imports: [SharedModule],
  exports: [ScoreMedalComponent, ScoreTagComponent],
})
export class StatisticModule {}
