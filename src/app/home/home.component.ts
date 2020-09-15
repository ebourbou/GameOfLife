﻿import { Component } from '@angular/core';

import { User } from '../_models';
import { AuthService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AuthService) {
        this.user = this.accountService.userValue;
    }
}