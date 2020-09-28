import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from 'aws-amplify';

import { AuthService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return Auth.currentAuthenticatedUser().then(() => { return true; })
        .catch(() => {
          this.router.navigate(['/auth/login']);
          return false;
        });

      return true;
    }
}
