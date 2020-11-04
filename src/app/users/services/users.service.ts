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

  updateUser(user: User): Promise<UpdateUserMutation> {
    return this.api.UpdateUser(user);
  }
}
