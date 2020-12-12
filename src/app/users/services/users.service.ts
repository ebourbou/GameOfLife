import { Injectable } from '@angular/core';
import { APIService, CreatePatternMutation, CreateUserMutation, GetUserQuery, ListUsersQuery, UpdateUserMutation } from '../../API.service';
import { User } from '../../shared/model/user';
import { UserUtils } from '../utils/user-utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: APIService) {}

  createUser(user: User): Promise<CreateUserMutation> {
    const input: any = UserUtils.toAwsPattern(user);
    return this.api.CreateUser(input);
  }

  getUsers(): Promise<ListUsersQuery> {
    return this.api.ListUsers();
  }

  getUser(id: string): Promise<GetUserQuery> {
    return this.api.GetUser(id);
  }

  updateUserRole(user: User): Promise<UpdateUserMutation> {
    const update = {
      id: user.id,
      role: user.role.valueOf(),
    };
    return this.api.UpdateUser(update);
  }
  updateLastLogin(user: User): Promise<UpdateUserMutation> {
    const update = {
      id: user.id,
      lastLogin: new Date().toISOString(),
    };
    return this.api.UpdateUser(update);
  }
}
