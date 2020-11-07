import { LOCALE_ID, NgModule } from '@angular/core';
import localeDECH from '@angular/common/locales/de-CH';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ConfirmDeleteDialog } from './designer/confirm-delete-dialog/confirm-delete-dialog.component';
import { DesignerModule } from './designer/designer.module';
import { ErrorInterceptor } from './auth/error.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { registerLocaleData } from '@angular/common';
import { PatternService } from './designer/services/patterns.service';
import { UserService } from './users/services/users.service';

registerLocaleData(localeDECH);

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PasswordStrengthMeterModule,
    DesignerModule,
    AmplifyAngularModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmDeleteDialog],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: LOCALE_ID, useValue: "de-CH" },
    { provide: UserService, useClass: UserService},
    { provide: PatternService, useClass: PatternService},
    AmplifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
