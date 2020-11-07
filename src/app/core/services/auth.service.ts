import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Auth} from '@aws-amplify/auth';
import {fromPromise} from 'rxjs/internal-compatibility';
import {APIService} from '../../API.service';
import { User } from '../../shared/model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private api: APIService
  ) {}

  public getUser(): User{
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
      }})
    );
  }

  /** confirm code */
  public verify(username, code) {
    return Auth.confirmSignUp(username, code);
  }

  /** signin */
  public login(username, password): Observable < any > {
    return fromPromise(Auth.signIn(username, password))
      .pipe(
        tap(() => {
          this.loggedIn.next(true);
          const user = new User();
          user.username = username;
          this.user.next(user);
        })
      );
  }

  /** get authenticate state */
  public isAuthenticated(): Observable < boolean > {
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
          this.user.next(null);
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

  public getToken(): string {
    Auth.currentUserPoolUser().then(pool => {
       return pool.signInUserSession.idToken.jwtToken;
    });
    return null;
  }
}
