import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { PatternDetailComponent } from './pattern-detail/pattern-detail.component';
import { PatternsComponent } from './pattern-list/patterns.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { DesignerRoutingModule } from './designer-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    LayoutComponent,
    PatternDetailComponent,
    PatternsComponent
  ]
})
export class DesignerModule {}
