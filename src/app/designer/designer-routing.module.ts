import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatternsComponent } from './pattern-list/patterns.component';

const routes: Routes = [
  { path: "designer", component: PatternsComponent },
  { path: "", redirectTo: "designer", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
