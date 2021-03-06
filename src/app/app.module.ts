import { LOCALE_ID, NgModule } from '@angular/core';
import localeDECH from '@angular/common/locales/de-CH';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ConfirmDeleteDialogComponent } from './designer/confirm-delete-dialog/confirm-delete-dialog.component';
import { DesignerModule } from './designer/designer.module';
import { ErrorInterceptor } from './auth/error.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { registerLocaleData } from '@angular/common';

import { UserService } from './users/services/users.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PatternService } from './shared/service/patterns.service';
import { AbstractRuleService } from './shared/service/rule/abstract-rule.service';
import { GameService } from './shared/service/game.service';
import { ScoreService } from './statistic/service/score.service';
import { StatisticModule } from './statistic/statistic.module';
import { LocalRuleService } from './shared/service/rule/local-rule.service';
import { GamerModule } from './gamer/gamer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { AuthService } from './core/services/auth.service';
import { RatingService } from './shared/service/rating.service';

registerLocaleData(localeDECH);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    DesignerModule,
    AmplifyAngularModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    MatToolbarModule,
    StatisticModule,
    HomeModule,
    GamerModule,
  ],
  declarations: [AppComponent, ConfirmDeleteDialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: UserService, useClass: UserService },
    { provide: AuthService, useClass: AuthService },
    { provide: RatingService, useClass: RatingService },
    { provide: PatternService, useClass: PatternService },
    { provide: AbstractRuleService, useClass: LocalRuleService },
    { provide: GameService, useClass: GameService },
    { provide: ScoreService, useClass: ScoreService },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    AmplifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
