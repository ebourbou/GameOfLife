import { NgModule } from '@angular/core';
import { GamerComponent } from './gamer/gamer.component';
import {SharedModule} from '../shared/shared.module';
import {GamerRoutingModule} from './gamer-routing.module';

@NgModule({
  declarations: [GamerComponent],
  imports: [SharedModule, GamerRoutingModule],
  exports: [GamerComponent],
})
export class GamerModule {}
