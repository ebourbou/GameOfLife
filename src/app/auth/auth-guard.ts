import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { User } from '../shared/model/user';
import { AmplifyService } from 'aws-amplify-angular';
import { UserUtils } from '../users/utils/user-utils';
import { UserService } from '../users/services/users.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private user: User = null;
  constructor(private router: Router, private auth: AuthService, private amplifyService: AmplifyService) {}

  canActivate(): boolean {
    return this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then((user) => true)
      .catch((err) => {
        this.router.navigate(['']);
        return false;
      });
  }
}
