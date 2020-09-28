import { Component } from '@angular/core';

import { User } from '../_models';
import { AuthService } from '../_services';
import {Observable} from 'rxjs';

@Component({ templateUrl: 'home.component.html' , styleUrls: ['home.component.scss'] })
export class HomeComponent {
    user: Observable<User>;

    constructor(private accountService: AuthService) {
        this.user = this.accountService.getUser();
        console.log(this.user);
    }
}
