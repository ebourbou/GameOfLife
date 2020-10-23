import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternDetailComponent } from './pattern-detail.component';
import { PatternListComponent} from './pattern-list.component';
// ROUTES
const appRoutes: Routes = [

  { path: '', redirectTo: 'pattern-list', pathMatch: 'full' },
  { path: 'pattern-list', component: PatternListComponent },
  { path: 'pattern-details/:id', component: PatternDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class PatternRoutingModule { }
