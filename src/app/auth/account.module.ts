import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [AccountRoutingModule, PasswordStrengthMeterModule, SharedModule],
  declarations: [LayoutComponent, LoginComponent, RegisterComponent],
})
export class AccountModule {}
