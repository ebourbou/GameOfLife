import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { AmplifyService } from 'aws-amplify-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private amplifyService: AmplifyService) {}

  canActivate(): boolean {
    return this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(() => true)
      .catch(() => {
        this.router.navigate(['']);
        return false;
      });
  }
}
