import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { OverviewDetailComponent } from './components';
import { OverviewRouterLinkDirective } from './directives';
import { BreakpointService } from './services';
import {CommonModule} from '@angular/common';

const components = [ OverviewDetailComponent ];
const directives = [ OverviewRouterLinkDirective ];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    LayoutModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    ...components,
    ...directives
  ],
  providers: [
    BreakpointService
  ]
})
export class MasterDetailModule { }
