import { Injectable } from '@angular/core';
import { APIService, GetUserQuery, ListUsersQuery, UpdateUserMutation } from '../../API.service';
import { User } from '../../shared/model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: APIService) {
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
      role: user.role.valueOf()
    }
    return this.api.UpdateUser(update);
  }
}
