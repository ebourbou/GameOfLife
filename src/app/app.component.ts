import { Component, OnDestroy, OnInit } from '@angular/core';

import { AmplifyService } from 'aws-amplify-angular';
import { NavigationStart, Router } from '@angular/router';
import { User } from './shared/model/user';
import { AuthService } from './core/services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { UserService } from './users/services/users.service';
import { Role } from './shared/model/role';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from './shared/service/notification.service';
import { BreakpointService } from './shared/service/breakpoint.service';
import { ScreenSize } from './shared/service/screen-size.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  screenSize$: Observable<ScreenSize>;

  title = 'GameOfLife';
  user: User;
  authenticated = false;
  subscription: Subscription;

  constructor(
    private amplify: AmplifyService,
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private metaService: Meta,
    private breakpointService: BreakpointService
  ) {
    this.metaService.addTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    });

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!router.navigated) {
          const userId = sessionStorage.getItem('userId');
          if (userId && this.authService.getCurrentUser() == null) {
            this.authService.reloadCurrentUser().then(() => null);
            this.user = this.authService.getCurrentUser();
          } else {
            this.user = null;
          }
        }
      }
    });
    this.matIconRegistry.addSvgIcon('gol_board', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/ruler-2-line.svg'));
    this.matIconRegistry.addSvgIcon('gol_cell', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/leaf-fill.svg'));
    this.matIconRegistry.addSvgIcon('gol_rule', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/scales-fill.svg'));
    this.matIconRegistry.addSvgIcon('gol_play', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/play-fill.svg'));
    this.matIconRegistry.addSvgIcon('gol_analyze', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/analyze.svg'));
    this.matIconRegistry.addSvgIcon('gol_save', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/save-fill.svg'));
    this.matIconRegistry.addSvgIcon('tortoise', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/tortoise.svg'));
    this.matIconRegistry.addSvgIcon('rabbit', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/rabbit.svg'));
    this.matIconRegistry.addSvgIcon('medal_fill', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/medal-fill.svg'));
    this.matIconRegistry.addSvgIcon('medal_line', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/medal-line.svg'));
    this.matIconRegistry.addSvgIcon('mushroom_cloud', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/mushroom2.svg'));
    this.matIconRegistry.addSvgIcon('small', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/small.svg'));
    this.matIconRegistry.addSvgIcon('medium', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/medium.svg'));
    this.matIconRegistry.addSvgIcon('large', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/large.svg'));
    this.matIconRegistry.addSvgIcon('spaceship', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/spaceship.svg'));
    this.matIconRegistry.addSvgIcon('static', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/static.svg'));
    this.matIconRegistry.addSvgIcon('oscillator', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/oscillator.svg'));
    this.matIconRegistry.addSvgIcon('buffer', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/buffer.svg'));
    this.matIconRegistry.addSvgIcon('pattern', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/pattern.svg'));
    this.matIconRegistry.addSvgIcon('rule', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/rule.svg'));
    this.matIconRegistry.addSvgIcon('activity', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/activity.svg'));
    this.matIconRegistry.addSvgIcon('brutality', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/brutality.svg'));
    this.matIconRegistry.addSvgIcon('difficulty', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/difficulty.svg'));
    this.matIconRegistry.addSvgIcon('excitement', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/excitement.svg'));
    this.matIconRegistry.addSvgIcon('population', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/population.svg'));
    this.matIconRegistry.addSvgIcon('joker', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/joker.svg'));
    this.matIconRegistry.addSvgIcon(
      'reproduction',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/reproduction.svg')
    );
    this.matIconRegistry.addSvgIcon('runtime', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/runtime.svg'));
    this.matIconRegistry.addSvgIcon('neighbors', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/neighbors.svg'));
    this.matIconRegistry.addSvgIcon('golTitle', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/GameOfLife.svg'));
  }

  logout(): void {
    this.authService.logout();
    this.authenticated = false;
    this.user = null;
    this.router.navigate(['/auth/login']).then((navigated: boolean) => {
      if (navigated) {
        this.notificationService.info('Benutzer abgemeldet ');
      }
    });
  }

  showLogin(): void {
    this.router.navigate(['/auth']).catch((e) => {
      this.notificationService.error('Fehler beim Anmelden: ' + e);
    });
  }

  ngOnInit(): void {
    this.authService.authenticated.subscribe((value) => {
      this.authenticated = value;
      if (value) {
        this.user = this.authService.getCurrentUser();
      }
    });

    this.authService.user.subscribe((value) => {
      this.user = value;
    });

    this.screenSize$ = this.breakpointService.subscribeToScreenSizeChanges();
  }

  hasRole(role: Role): boolean {
    const user = this.authService.getCurrentUser();
    return user && user.role === role;
  }

  hasAdminRole(): boolean {
    return this.hasRole(Role.Admin);
  }
  hasGuestRole(): boolean {
    return this.hasRole(Role.Anonymous);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
