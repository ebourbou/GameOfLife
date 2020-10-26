
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent, MasterComponent } from './pages';
import {HeaderComponent, ListItemComponent} from './components';
import { StoreModule } from '@ngrx/store';
import { DesignerRoutingModule } from './designer-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MasterDetailModule} from '../_components/master-detail/master-detail.module';
import {CommonModule} from '@angular/common';
import {featureStateName, PatternEffects, patternReducer} from './state';
import {EffectsModule} from '@ngrx/effects';
import {LayoutComponent} from './layout.component';
import {OverviewDetailComponent} from '../_components/master-detail/components';

@NgModule({
  declarations: [
    MasterComponent,
    DetailComponent,
    HeaderComponent
  ],
  imports: [
    DesignerRoutingModule,
    StoreModule.forFeature(featureStateName, patternReducer),
    EffectsModule.forFeature([PatternEffects]),
    StoreDevtoolsModule.instrument(),
    MasterDetailModule,
    CommonModule,
  ],
  bootstrap: [
    OverviewDetailComponent
  ]
})
export class DesignerModule {
  constructor() {
    console.log('Designer Module');
  }


}
