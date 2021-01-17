import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './container/game.component';

const routes: Routes = [{ path: 'play', component: GameComponent, runGuardsAndResolvers: 'always' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
