import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SparklineComponent } from './sparkline/sparkline.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL = [MatBadgeModule, MatIconModule, MatSelectModule, MatButtonModule, MatInputModule,
                  MatFormFieldModule, MatCardModule, MatListModule, MatTableModule, MatSliderModule,
                  MatSnackBarModule, MatMenuModule, MatToolbarModule, MatDialogModule];

@NgModule({
  declarations: [SparklineComponent],
  imports: [CommonModule, ...MATERIAL],
  exports: [CommonModule, RouterModule, FormsModule, SparklineComponent, ...MATERIAL],
})
export class SharedModule {}
