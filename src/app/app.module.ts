import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import localeDECH from '@angular/common/locales/de-CH';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { UserService } from './users/services/users.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { PatternService } from './shared/service/patterns.service';
import { MockRuleService } from './shared/service/rule/mock-rule.service';
import { AbstractRuleService } from './shared/service/rule/abstract-rule.service';
import { GameService } from './shared/service/game.service';
import { RatingService } from './shared/service/rating.service';
import { NotificationService } from './shared/service/notification.service';
import { CustomErrorHandler } from './auth/error-handler';

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
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
  ],
  declarations: [AppComponent, HomeComponent, ConfirmDeleteDialog],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: UserService, useClass: UserService },
    { provide: PatternService, useClass: PatternService },
    { provide: RatingService, useClass: RatingService },
    { provide: NotificationService, useClass: NotificationService },
    { provide: AbstractRuleService, useClass: MockRuleService },
    { provide: GameService, useClass: GameService },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    AmplifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
