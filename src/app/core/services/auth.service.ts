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

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSource: BehaviorSubject<User> = new BehaviorSubject<User>({} as any);
  user = this.userSource.asObservable();

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
      }).then((response) => {
        if (response.userConfirmed) {
          const userDB = new User();
          userDB.username = user;
          userDB.email = mail;
          this.userService.createUser(userDB).catch((error) => this.notificationService.error('Fehler beim Benutzer anlegen: ' + error));
        }
      })
    );
  }

  /** confirm code */
  public verify(username, code): Promise<any> {
    return Auth.confirmSignUp(username, code);
  }

  /** signin */
  public login(username, password): Observable<any> {
    return fromPromise(
      Auth.signIn(username, password).catch((reason) => this.notificationService.error('Login nicht erfolgreich: ' + reason))
    ).pipe(
      tap((cognitoUser) => {
        this.authenticated.next(true);

        let user: User;
        this.userService.getUser(cognitoUser.attributes.sub).then((value) => {
          if (value) {
            user = UserUtils.fromAws(value);
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              this.userSource.next(user);
            }
          } else {
            // no user yet,create
            user = new User();
            user.id = cognitoUser.attributes.sub;
            user.username = username;
            user.email = cognitoUser.attributes.email;
            this.userService
              .createUser(user)
              .then((result) => {
                localStorage.setItem('user', JSON.stringify(user));
              })
              .catch((anotherError) => console.log('Error user create' + JSON.stringify(anotherError)));
          }
        });
      })
    );
  }

  /** get authenticate state
   * https://github.com/aws-amplify/amplify-js/wiki/FAQ#will-amplify-automatically-refresh-the-aws-credentials?
   * */
  /** get authenticate state */
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
  public logout(): boolean {
    const user = UserUtils.loadUserFromLocal();
    this.userService
      .updateLastLogin(user)
      .then((value) => {
        Auth.signOut()
          .then(
            () => {
              this.authenticated.next(false);
              this.userSource.next(null);
              return true;
            },
            (error) => {
              return false;
            }
          )
          .finally(() => localStorage.clear());
      })
      .catch((err) => this.notificationService.error('Fehler beim Benutzer speichern: letztes login:' + err));

    return true;
  }

  public async updateUser(mail: string, role: string) {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
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
}
