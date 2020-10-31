import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher, MatOptionModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ConfirmDeleteDialog } from './designer/pattern-detail/confirm-delete-dialog.component';
import { DesignerModule } from './designer/designer.module';
import { ErrorInterceptor } from './auth/error.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { UserComponent } from './users/user.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    PasswordStrengthMeterModule,
    MatOptionModule,
    MatToolbarModule,
    MatMenuModule,
    DesignerModule,
    AmplifyAngularModule,
    MatDialogModule,
    SharedModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ConfirmDeleteDialog],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    AmplifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
