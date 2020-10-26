import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./auth/account.module').then((x) => x.AccountModule);
const usersModule = () => import('./users/users.module').then((x) => x.UsersModule);
const patternModule = () => import('./designer/designer.module').then((x) => x.DesignerModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'designer', loadChildren: patternModule, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: accountModule },
  { path: 'game', loadChildren: () => import('./game/game.module').then((m) => m.GameModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
