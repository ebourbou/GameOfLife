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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselComponent } from './carousel/carousel.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RatingComponent } from './rating/rating.component';

const MATERIAL = [
  MatBadgeModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatOptionModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatSelectModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [SparklineComponent, CarouselComponent, RatingComponent],
  imports: [CommonModule, PasswordStrengthMeterModule, ...MATERIAL],
  exports: [CommonModule, RouterModule, FormsModule, SparklineComponent, ...MATERIAL, RatingComponent, CarouselComponent],
})
export class SharedModule {}
