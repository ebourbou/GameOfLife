import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services';
import {User} from '../_models';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import {NgForm} from '@angular/forms';


/*
 TODO:  password confirm field
 */

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss']  })
export class LoginComponent implements OnInit {
    user = new User();
    public loginInvalid: boolean;
    public authState: AuthState;

    loading = false;
    hidePwd = true;
    submitted = false;
    returnUrl: string;

    @ViewChild('form', {static: true}) form: NgForm;

    constructor(
        public amplifyService: AmplifyService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private snackBarService: MatSnackBar
    ) {
        this.amplifyService = amplifyService;
    }

    ngOnInit(): void {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    onSubmit(form: NgForm): void {
        console.log(form.value);
        this.loginInvalid = false;
        this.submitted = true;
        this.loading = true;

        this.amplifyService.authStateChange$
            .subscribe(authState => {
                if (!authState.user) {
                    this.user = null;
                } else {
                   this.user.username = authState.user.username;
                   this.user.email = authState.user.attributes.email;
                }
            });

        this.authService.login(this.form.controls.username.value, this.form.controls.password.value).subscribe((data) => {
         // console.log('data ' + JSON.stringify(data));
          this.loading = false;
          this.router.navigate([this.returnUrl]).then((navigated: boolean) => {
            if (navigated) {
              this.loginInvalid = false;
              this.snackBarService.open('Willkommen zurück ' + data.username , 'Schliessen', {
                duration: 2000
              });
            }
          });
        }, (error) => {
          this.loading = false;
          this.loginInvalid = true;

          console.log('errSignIn: ' + JSON.stringify(error));
          let errMsg = 'unbekannt';
          switch (error.code){
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
          this.snackBarService.open('Fehler beim Anmelden: ' + errMsg, 'Schliessen', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
        );




        /*
          .next(user => {
            console.log('user: ' + user);
            this.loading = false;
            this.router.navigate(['']).then((navigated: boolean) => {
                if (navigated) {
                  this.loginInvalid = false;

                  // No remaining auth challenges need to be satisfied
              //    const session = await Auth.currentSession();
                  // console.log('Cognito User Access Token:', session.getAccessToken().getJwtToken());
                //  console.log('Cognito User Identity Token:', session.getIdToken().getJwtToken());
                  // console.log('Cognito User Refresh Token', session.getRefreshToken().getToken());

                  this.snackBarService.open('Willkommen zurück ', 'Schliessen', {
                        duration: 2000
                    });
                }
                });

            })
            .catch(errSignIn => {
              this.loading = false;
              this.loginInvalid = true;

              console.log('errSignIn: ' + JSON.stringify(errSignIn));
              let errMsg = 'unbekannt';
              switch (errSignIn.code){
                    case 'NetworkError':
                        errMsg = 'Keine Verbindung zum Internet';
                        break;
                    case 'UserNotFoundException':
                        errMsg = 'Benutzer oder Passwort falsch';
                        break;
                }

              this.snackBarService.open('Fehler beim Anmelden: ' + errMsg, 'Schliessen', {
                    duration: 3000,
                    panelClass: ['snackbar-error']
                });
            });
            */

    }
}

