import { Injectable } from '@angular/core';
import { APIService, GetUserQuery, ListUsersQuery, UpdateUserMutation } from '../../API.service';
import { User } from '../../shared/model/user';
import { Role } from '../../shared/model/role';

@Injectable({
  providedIn: 'root',
})
export class UserMockService {
  private currentUser: User;
  private userPool = new Array<User>();

  constructor(private api: APIService) {
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
    return new Promise((response, reject) => {
      return { items: this.userPool };
    });
  }

  getUser(id: string): Promise<GetUserQuery> {
    return new Promise((resolve, reject) => {
      return this.currentUser;
    });
  }

  updateUserRole(user: User): Promise<UpdateUserMutation> {
    const foundUser = this.userPool.find((u) => u.id === user.id);

    foundUser.role = user.role;
    return new Promise<UpdateUserMutation>((resolve, reject) => {
      return foundUser;
    });
  }
}
