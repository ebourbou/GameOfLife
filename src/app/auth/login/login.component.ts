import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgForm } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../shared/service/notification.service';

/*
 TODO:  password confirm field
 */

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss'] })
export class LoginComponent implements OnInit {
  user = new User();
  public loginInvalid: boolean;
  public loading = false;
  public hidePwd = true;
  private submitted = false;
  returnUrl: string;

  @ViewChild('form', { static: true }) form: NgForm;

  constructor(
    private amplifyService: AmplifyService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.submitted = true;
    this.loading = true;

    /*this.amplifyService.authStateChange$.subscribe((authState) => {
      if (!authState.user) {
        this.user = null;
      } else if (this.user) {
        this.user.username = authState.user.username;
        this.user.email = authState.user.attributes.email;
      }
    });*/

    this.authService.login(this.form.controls.username.value, this.form.controls.password.value).subscribe(
      (data) => {
        this.loading = false;
        this.router.navigate([this.returnUrl]).then((navigated: boolean) => {
          if (navigated) {
            this.loginInvalid = false;
            this.notificationService.info('Willkommen zurück ' + data.username);
          }
        });
      },
      (error) => {
        this.loading = false;
        this.loginInvalid = true;

        let errMsg = 'unbekannt';
        switch (error.code) {
          case 'NetworkError':
            errMsg = 'Keine Verbindung zum Internet';
            break;
          case 'UserNotFoundException':
            errMsg = 'Benutzer oder Passwort falsch';
            break;
          case 'NotAuthorizedException':
            errMsg = 'Benutzer oder Passwort falsch';
            break;
        }
        this.notificationService.error('Fehler beim Anmelden: ' + errMsg);
      }
    );
  }
}
