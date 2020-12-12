import { Component, OnInit, ViewChild } from '@angular/core';
import { ListUsersQuery } from '../../API.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../services/users.service';

@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.scss'] })
export class ListComponent implements OnInit {
  users = null;
  constructor(private authService: AuthService, private userService: UserService) {}
  displayedColumns = ['username', 'email', 'role', 'actions'];

  ngOnInit(): void {
    this.userService.getUsers().then((list: ListUsersQuery) => {
      this.users = list.items;
    });
  }
}
