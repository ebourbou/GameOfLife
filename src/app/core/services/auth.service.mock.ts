import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Auth } from '@aws-amplify/auth';
import { fromPromise } from 'rxjs/internal-compatibility';
import { APIService } from '../../API.service';
import { User } from '../../shared/model/user';
import { UserUtils } from '../../users/utils/user-utils';
import { UserService } from '../../users/services/users.service';
import { AmplifyService } from 'aws-amplify-angular';
import { NotificationService } from '../../shared/service/notification.service';
import { Role } from '../../shared/model/role';

@Injectable({ providedIn: 'root' })
export class AuthServiceMock {
  private currentUser: User;
  private userPool: Array<User>;
  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSource: BehaviorSubject<User> = new BehaviorSubject<User>({} as any);
  user = this.userSource.asObservable();

  constructor() {
    this.userPool = new Array<User>();
    this.userPool.push({
      id: Date(),
      username: 'user',
      password: 'user',
      email: 'user@nowhere.com',
      role: Role.User,
      lastLogin: Date(),
    });

    this.userPool.push({
      id: Date(),
      username: 'admin',
      password: 'admin',
      email: 'admin@nowhere.com',
      role: Role.Admin,
      lastLogin: Date(),
    });
  }

  public getUser(): User {
    return this.currentUser;
  }

  /** signup */
  public register(user, pwd, mail): Observable<any> {
    const newUser: User = {
      id: Date(),
      username: user,
      password: pwd,
      email: mail,
      role: Role.User,
      lastLogin: Date(),
    };
    this.userPool.push(newUser);
    return of(user);
  }

  /** confirm code */
  public verify(username, code): Observable<any> {
    return fromPromise(username);
  }

  /** signin */
  public login(username, password): Observable<any> {
    const userLoaded = this.userPool.find((user) => user.username === username && user.password === password);
    if (userLoaded) {
      sessionStorage.setItem('user', JSON.stringify(userLoaded));
      this.userSource.next(userLoaded);
      this.authenticated.next(true);
    }
    return of(userLoaded);
  }

  /** get authenticate state
   * https://github.com/aws-amplify/amplify-js/wiki/FAQ#will-amplify-automatically-refresh-the-aws-credentials?
   */
  /** get authenticate state */
  public isAuthenticated(): Observable<boolean> {
    return of(this.currentUser != null);
  }

  /** signout */
  public logout(): boolean {
    this.currentUser = null;
    this.userSource.next(null);
    this.authenticated.next(false);
    return true;
  }

  public async updateUser(mail: string, role: string) {
    this.currentUser.email = mail;
    this.currentUser.role = Role[role];
  }

  public getToken(): string {
    Auth.currentUserPoolUser().then((pool) => {
      return pool.signInUserSession.idToken.jwtToken;
    });
    return null;
  }
}
