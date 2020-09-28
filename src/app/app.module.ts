import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserComponent} from './_components';
import {HomeComponent} from './home';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ErrorStateMatcher, MatOptionModule, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PasswordStrengthMeterModule} from 'angular-password-strength-meter';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { PatternModule } from './designer/pattern.module';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
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
    PatternModule,
    AmplifyAngularModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
