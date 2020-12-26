import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatternsComponent } from './pattern-list/patterns.component';
import { AuthGuard } from '../auth/auth-guard';
import { RuleListComponent } from './rule/rule-list/rule-list.component';

const routes: Routes = [
  { path: 'rules', pathMatch: 'full', component: RuleListComponent, canActivate: [AuthGuard] },
  { path: 'patterns', pathMatch: 'full', component: PatternsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignerRoutingModule {}
