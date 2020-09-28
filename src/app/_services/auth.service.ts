import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from '../_models';
import {Auth} from 'aws-amplify';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;

  constructor(
    private router: Router
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public getUser(): Observable<User>{
    Auth.currentAuthenticatedUser().then(u =>
    {
      const user = new User();
      user.username = u.username;
      user.email = u.attributes.email;
      return user;
    });
    return null;
  }
  /** signup */
  public register(user, pwd, mail): Observable<any> {
    return fromPromise(Auth.signUp({
      username: user,
      password: pwd,
      attributes: {
        email: mail
      }}));
  }

  /** confirm code */
  public verify(email, code): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email, code));
  }

  /** signin */
  public login(email, password): Observable<any> {
    return fromPromise(Auth.signIn(email, password))
      .pipe(
        tap(() => {
          this.loggedIn.next(true);
        })
      );
  }

  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    // @ts-ignore
    return fromPromise(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  /** signout */
  public logout() {
    fromPromise(Auth.signOut())
      .subscribe(
        result => {
          this.loggedIn.next(false);
        },
        error => console.log(error)
      );
  }

  public async updateUser(mail: string, role: string){
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
      'custom:role': role,
      email: mail
    });
  }

  getToken(): string {
    Auth.currentUserPoolUser().then(pool => {
       return pool.signInUserSession.idToken.jwtToken;
    });
    return null;
  }
}
