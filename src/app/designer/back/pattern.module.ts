import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { PatternDetailComponent } from './pattern-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {PatternListComponent} from './pattern-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {PatternRoutingModule} from './pattern-routing.module';

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
    PatternListComponent
  ]
})
export class PatternModule { }
