import { Component, OnInit, ViewChild } from '@angular/core';
import { ListUsersQuery } from '../../API.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../services/users.service';


@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.scss']})
export class ListComponent implements OnInit {
    users = null;
    constructor(private authService: AuthService,
                private userService: UserService) {}
    displayedColumns = ['username', 'email', 'role', 'actions'];

    ngOnInit() {
      this.userService.getUsers().then((list: ListUsersQuery) => {
        this.users = list.items;
      });

      // Todo
      // this.authService.getPage(this.paginator.pageIndex, this.paginator.pageSize)
      /*  this.authService.getAll()
              .pipe(first())
              .subscribe(users => this.users = users);*/
    }

    deleteUser(id: string): void {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
     /*   this.authService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id);
            });*/
    }

/*public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }*/
}
