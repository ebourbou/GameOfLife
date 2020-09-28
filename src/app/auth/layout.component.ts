﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services';

@Component({ templateUrl: 'layout.component.html'})
export class LayoutComponent {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        // redirect to home if already logged in
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        }
    }
}
