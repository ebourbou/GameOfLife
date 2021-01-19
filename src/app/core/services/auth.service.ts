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
export class AuthService {
  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSource: BehaviorSubject<User> = new BehaviorSubject<User>({} as any);
  user = this.userSource.asObservable();
  private currentUser: User;

  constructor(
    private router: Router,
    private api: APIService,
    private userService: UserService,
    private amplify: AmplifyService,
    private notificationService: NotificationService
  ) {}

  public getUser(): User {
    Auth.currentAuthenticatedUser()
      .then(
        (u) => {
          const user = new User();
          user.username = u.username;
          user.email = u.attributes.email;

          this.authenticated.next(true);
          this.userSource.next(user);
          return user;
        },
        (reason) => {
          console.log('Error getting user ' + reason);
          this.authenticated.next(false);
          return null;
        }
      )
      .catch((reason) => this.notificationService.error('Fehler beim Benutzer laden: ' + reason));
    this.authenticated.next(false);
    return null;
  }

  /** signup */
  public register(user, pwd, mail): Observable<any> {
    return fromPromise(
      Auth.signUp({
        username: user,
        password: pwd,
        attributes: {
          email: mail,
        },
      })
    );
  }

  /** confirm code */
  public verify(username, code, mail): Promise<any> {
    return Auth.confirmSignUp(username, code);
  }

  /** signin */
  public login(username, password): Observable<any> {
    return fromPromise(
      Auth.signIn(username, password).catch((reason) => this.notificationService.error('Login nicht erfolgreich: ' + reason))
    ).pipe(
      tap((cognitoUser) => {
        this.authenticated.next(true);

        console.log('Loading ' + cognitoUser.attributes.sub);
        this.userService.getUser(cognitoUser.attributes.sub).then(
          (value) => {
            if (value) {
              this.currentUser = UserUtils.fromAws(value);
              if (this.currentUser) {
                sessionStorage.setItem('userId', this.currentUser.id);
                this.userSource.next(this.currentUser);
              }
            }
          },
          (error) => this.notificationService.error('Fehler beim Benutzer anlegen: ' + error)
        );
      })
    );
  }

  /** get authenticate state
   * https://github.com/aws-amplify/amplify-js/wiki/FAQ#will-amplify-automatically-refresh-the-aws-credentials?
   */
  public isAuthenticated(): Observable<boolean> {
    return fromPromise(Auth.currentAuthenticatedUser()).pipe(
      map(() => {
        console.log('isAuthenticated: true');
        this.authenticated.next(true);
        return true;
      }),
      catchError(() => {
        console.log('isAuthenticated: false');
        this.authenticated.next(false);
        return of(false);
      })
    );
  }
  /** signout */
  public logout(storeLastLogin: boolean = true): boolean {
    if (storeLastLogin) {
      const user = this.getCurrentUser();
      if (user) {
        this.userService
          .updateLastLogin(user)
          .then(() => {
            Auth.signOut().then(
              () => {
                this.authenticated.next(false);
                this.userSource.next(null);
                return true;
              },
              () => {
                return false;
              }
            );
          })
          .catch((err) => this.notificationService.error('Fehler beim Benutzer speichern: letztes login:' + err));
      }
    }
    sessionStorage.clear();
    return true;
  }

  public async updateUser(mail: string, role: string): Promise<void> {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      'custom:role': role,
      email: mail,
    });
    this.userSource.next(user);
  }

  public getToken(): string {
    Auth.currentUserPoolUser().then((pool) => {
      return pool.signInUserSession.idToken.jwtToken;
    });
    return null;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public async reloadCurrentUser(): Promise<void> {
    console.log('getCurrentUser');
    if (await Auth.currentSession()) {
      // load via user id from session storage
      const userId = sessionStorage.getItem('userId');

      if (userId) {
        this.currentUser = UserUtils.fromAws(await this.userService.getUser(userId));
        this.authenticated.next(true);
        this.userSource.next(this.currentUser);
      }
    }
  }
}
