import { NgModule } from '@angular/core';
import { GamerComponent } from './gamer/gamer.component';
import { SharedModule } from '../shared/shared.module';
import { GamerRoutingModule } from './gamer-routing.module';
import { GameModule } from '../game/game.module';

@NgModule({
  declarations: [GamerComponent],
  imports: [SharedModule, GamerRoutingModule, GameModule],
  exports: [GamerComponent],
})
export class GamerModule {}
