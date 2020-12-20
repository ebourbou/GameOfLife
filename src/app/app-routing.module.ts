import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const accountModule = () => import('./auth/account.module').then((x) => x.AccountModule);
const usersModule = () => import('./users/users.module').then((x) => x.UsersModule);
const designerModule = () => import('./designer/designer.module').then((x) => x.DesignerModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'designer', loadChildren: designerModule, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/account.module').then((m) => m.AccountModule) },
  { path: 'game', loadChildren: () => import('./game/game.module').then((m) => m.GameModule) },
  { path: 'gamer', loadChildren: () => import('./gamer/gamer.module').then((m) => m.GamerModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
