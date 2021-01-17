import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/model/user';
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

  /** signout */
  public logout(): boolean {
    this.currentUser = null;
    this.userSource.next(null);
    this.authenticated.next(false);
    return true;
  }

  public async updateUser(mail: string, role: string): Promise<void> {
    this.currentUser.email = mail;
    this.currentUser.role = Role[role];
  }
}
