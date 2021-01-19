import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../shared/service/notification.service';
import { Role } from '../../shared/model/role';
import { UserService } from '../../users/services/users.service';
import { Auth } from '@aws-amplify/auth';

/** Error when invalid control is dirty, touched, or submitted. */
export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({ templateUrl: 'register.component.html', styleUrls: ['register.component.scss'] })
export class RegisterComponent implements OnInit {
  user = new User();
  loading = false;
  hidePwd = true;
  submitted = false;
  id = null;

  matcher = new FormErrorStateMatcher();

  @ViewChild('form', { static: true }) form: NgForm;
  validationMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (!this.validationMode) {
      this.submitted = true;
      this.loading = true;

      this.authService
        .register(this.form.controls.username.value, this.form.controls.password.value, this.form.controls.email.value)
        .subscribe(
          (data) => {
            console.log('Register: ' + JSON.stringify(data));
            this.loading = false;
            this.validationMode = true;
            this.id = data.id;
          },
          (error) => {
            this.loading = false;

            let errMsg = 'unbekannt';
            switch (error.code) {
              case 'NetworkError':
                errMsg = 'Keine Verbindung zum Internet';
                break;
              case 'UserNotFoundException':
                errMsg = 'Benutzer oder Passwort falsch';
                break;
              case 'UsernameExistsException':
                errMsg = 'Benutzername wird schon verwendet';
                break;
              case 'CodeMismatchException':
                errMsg = 'Verfifikationscode ist nicht richtig';
                break;
            }

            this.notificationService.error('Fehler beim Registrieren: ' + errMsg);
          }
        );
    } else {
      const verificationCode = this.form.controls.code.value;
      this.authService.verify(this.user.username, verificationCode.toString(), this.user.email).then((data) => {
        // create user

        this.router
          .navigate(['/login'])
          .then((navigated: boolean) => {
            if (navigated) {
              this.notificationService.info('Benutzer Registrierung abgeschlossen');
            }
          })
          .catch(() => {
            this.notificationService.error('Verifizierung fehlgeschlagen. Falscher Code');
          });
      });
    }
  }
}
