import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatternsComponent } from './pattern-list/patterns.component';
import { AuthGuard } from '../auth/auth.guard';
import { MasterRouterLinkDirective } from './directives/master-router-link.directive';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { RuleListComponent } from './rule/rule-list/rule-list.component';

//const routes: Routes = [{ path: '', component: PatternsComponent, canActivate: [AuthGuard] }];
const directives = [MasterRouterLinkDirective];

/* Use a variable for detail routes,
   as they need to be added to the route
   map in 2 places (see below)... */
const detailRoutes = [
  {
    path: 'detail/:id',
    component: PatternDetailComponent,
  },
];

/*
const routes: Routes = [
  {
    path: '',
    redirectTo: 'master',
    pathMatch: 'full',
  },
  {
    path: 'master',
    component: PatternsComponent,
    children: [
      // Mobile 'Detail' Routes
      // are children of the master...
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'detail',
      },
      {
        path: 'detail',
        component: PatternDetailComponent,
      },
      ...detailRoutes,
    ],
  },
  // Desktop 'Detail' Routes
  // are siblings of the master...
  ...detailRoutes,
];
*/

const routes: Routes = [
  { path: 'rules', pathMatch: 'full', component: RuleListComponent, canActivate: [AuthGuard] },
  { path: 'patterns', pathMatch: 'full', component: PatternsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [...directives],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MasterRouterLinkDirective],
})
export class DesignerRoutingModule {}
