import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternDetailComponent } from './pattern-detail.component';
import { PatternOverviewComponent} from './pattern-overview.component';

const routes: Routes = [
    {
        path: '', component: PatternOverviewComponent,
        children: [
        {
          path: ':id',
          component: PatternDetailComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatternRoutingModule { }
