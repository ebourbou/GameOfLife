import { Component } from '@angular/core';
import {User} from './_models';
import {AuthService} from './_services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GameOfLife';
  user: User;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authService.logout();
  }
}
