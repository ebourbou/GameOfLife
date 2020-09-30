import {Component, NgModule, OnInit} from '@angular/core';
import {User} from './_models';
import {AuthService} from './_services';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Auth} from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'GameOfLife';
  user: User;
  authenticated = false;

  constructor(
    private amplify: AmplifyService,
    public authService: AuthService,
    private router: Router,
    private snackBarService: MatSnackBar) {
  }

  logout() {
    this.authService.logout();
    this.authenticated = false;
    this.user = null;
    this.router.navigate(['/auth/login']).then((navigated: boolean) => {
      if (navigated) {
        this.snackBarService.open('Benutzer abgemeldet ', 'Schliessen', {
          duration: 2000
        });
      }
    });
  }

  async ngOnInit() {

    await Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then((user) => {
        if (user) {
          this.authenticated = true;
        }
      })
      .catch(() => {
        this.authenticated = false;
        this.router.navigate(['/auth/login']);
      });
  }
}
