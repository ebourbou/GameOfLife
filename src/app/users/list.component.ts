import {Component, OnInit, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import {AuthService} from '../_services';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.scss']})
export class ListComponent implements OnInit {
    users = null;
    lowValue = 0;
    highValue = 20;
    constructor(private authService: AuthService) {}
    displayedColumns = ['username', 'email', 'role', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
      // Todo
        //this.authService.getPage(this.paginator.pageIndex, this.paginator.pageSize)
      this.authService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string): void {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.authService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id);
            });
    }

/*public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }*/
}
