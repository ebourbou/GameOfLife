import {Component,  OnInit} from '@angular/core';

import {AmplifyService} from 'aws-amplify-angular';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Auth} from '@aws-amplify/auth';
import { User } from './shared/model/user';
import { AuthService } from './core/services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
    private snackBarService: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('gol_board', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/ruler-2-line.svg'));
    this.matIconRegistry.addSvgIcon('gol_cell', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/leaf-fill.svg'));
    this.matIconRegistry.addSvgIcon('gol_rule', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/scales-fill.svg'));
    this.matIconRegistry.addSvgIcon('gol_play', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/play-fill.svg'));
    this.matIconRegistry.addSvgIcon('gol_analyze', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/analyze.svg'));
    this.matIconRegistry.addSvgIcon('gol_save', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/save-fill.svg'));
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
