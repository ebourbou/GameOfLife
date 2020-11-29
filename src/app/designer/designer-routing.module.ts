import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatternsComponent } from './pattern-list/patterns.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{ path: '', component: PatternsComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignerRoutingModule {}
