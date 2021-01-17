import { NgModule } from '@angular/core';
import { GamerComponent } from './gamer/gamer.component';
import { SharedModule } from '../shared/shared.module';
import { GamerRoutingModule } from './gamer-routing.module';
import { GameModule } from '../game/game.module';
import { StatisticModule } from '../statistic/statistic.module';

@NgModule({
  declarations: [GamerComponent],
  imports: [SharedModule, GamerRoutingModule, GameModule, StatisticModule],
  exports: [GamerComponent],
})
export class GamerModule {}
