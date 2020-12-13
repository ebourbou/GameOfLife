import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamerComponent } from './gamer/gamer.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'gamer', component: GamerComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'gamer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamerRoutingModule {}
