import { Injectable } from '@angular/core';
import { GetUserQuery, ListUsersQuery } from '../../API.service';
import { User } from '../../shared/model/user';
import { Role } from '../../shared/model/role';

@Injectable({
  providedIn: 'root',
})
export class UserMockService {
  private currentUser: User;
  private userPool = new Array<User>();

  constructor() {
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

  getUsers(): Promise<ListUsersQuery> {
    return new Promise(() => {
      return { items: this.userPool };
    });
  }

  getUser(): Promise<GetUserQuery> {
    return new Promise(() => {
      return this.currentUser;
    });
  }
}
