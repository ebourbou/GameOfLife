import {Component, OnInit} from '@angular/core';
import {User} from './_models';
import {AuthService} from './_services';
import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    public amplify: AmplifyService,
    private authService: AuthService,
    private router: Router,
    private snackBarService: MatSnackBar) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']).then((navigated: boolean) => {
      if (navigated) {
        this.snackBarService.open('Benutzer abgemeldet ', 'Schliessen', {
          duration: 2000
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authenticated = true;

      const user = this.authService.getUser();
      if (user) {
        this.authService.getUser().toPromise().then(u => {
          this.user = u;
        });
      }
    }else {
      this.authenticated = false;
    }
  }
}
