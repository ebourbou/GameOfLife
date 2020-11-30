import { Component, OnInit } from '@angular/core';

import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './shared/model/user';
import { AuthService } from './core/services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './users/services/users.service';
import { Role } from './shared/model/role';
import { UserUtils } from './users/utils/user-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GameOfLife';
  user: User;
  authenticated = false;

  constructor(
    private amplify: AmplifyService,
    public authService: AuthService,
    private userService: UserService,
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
    this.matIconRegistry.addSvgIcon('tortoise', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/tortoise.svg'));
    this.matIconRegistry.addSvgIcon('rabbit', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/rabbit.svg'));
  }

  logout(): void {
    this.authService.logout();
    this.authenticated = false;
    this.user = null;
    this.router.navigate(['/auth/login']).then((navigated: boolean) => {
      if (navigated) {
        this.snackBarService.open('Benutzer abgemeldet ', 'Schliessen', {
          duration: 2000,
        });
      }
    });
  }

  showLogin(): void {
    this.router.navigate(['/auth']).catch((e) => {
      console.log(e);
    });
  }

  ngOnInit(): void {
    this.authService.authenticated.subscribe((value) => {
      this.authenticated = value;
      if (value) {
        this.user = UserUtils.loadUserFromLocal();
      }
    });
  }

  isAdmin(role: Role): boolean {
    return role === Role.Admin;
  }
}
