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
export class AuthGuard implements CanActivate, OnInit {
  private user: User = null;
  constructor(
    private router: Router,
    private auth: AuthService,
    private amplifyService: AmplifyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then((result) => {
        const userStr = sessionStorage.getItem('user');
        if (!userStr) {
          // load user
          let user: User;
          this.userService.getUser(result.attributes.sub).then((value) => {
            if (value) {
              user = UserUtils.fromAws(value);
              if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
              }
            }
          });
        } else {
          this.user = JSON.parse(userStr);
        }
        return true;
      })
      .catch((err) => {
        this.router.navigate(['/auth/login']);
        return false;
      });
  }

  /*
    const loggedIn = this.auth.isAuthenticated().subscribe((value) => {
      return value;
    });
    if (!loggedIn) {
      console.log('Logged out');
      this.router.navigate(['/auth/login']);
      return of(false);
    } else {
      return of(true);
    }
  }*/

  /*
    return this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then((user) => true)
      .catch((err) => {
        this.router.navigate(['/auth/login']);
        return false;
      });*/
}
