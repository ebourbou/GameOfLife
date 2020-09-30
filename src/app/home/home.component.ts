import {Component, OnInit} from '@angular/core';

import { User } from '../_models';
import { AuthService } from '../_services';


@Component({ templateUrl: 'home.component.html' , styleUrls: ['home.component.scss'] })
export class HomeComponent implements  OnInit{
    user: User;

    constructor(
      private authService: AuthService
    ) {

    }

  async ngOnInit() {
   /* await Auth.currentAuthenticatedUser().then(u => {
      this.user = new User();
      this.user.username = u.username;
      this.user.id = u.attributes.sub;
    });
    console.log(this.user);*/
  }
}
