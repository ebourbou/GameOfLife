import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAuthenticated()
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            console.log('Logged out');
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }
}
