import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatternRoutingModule } from './pattern-routing.module';
import { LayoutComponent } from './layout.component';
import { PatternDetailComponent } from './pattern-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {PatternOverviewComponent} from './pattern-overview.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FlexModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    PatternRoutingModule,
    MatListModule
  ],
  declarations: [
    LayoutComponent,
    PatternDetailComponent,
    PatternOverviewComponent
  ]
})
export class PatternModule { }
