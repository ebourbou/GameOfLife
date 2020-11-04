import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './user-list/list.component';
import { AddEditComponent } from './user-edit/add-edit.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    UsersRoutingModule,
    PasswordStrengthMeterModule,
    SharedModule,
    FormsModule
  ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class UsersModule {}
