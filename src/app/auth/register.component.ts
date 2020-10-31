import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AmplifyService} from 'aws-amplify-angular';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { User } from '../shared/model/user';
import { AuthService } from '../core/services/auth.service';

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

    matcher = new FormErrorStateMatcher();

  @ViewChild('form', { static: true }) form: NgForm;
  validationMode = false;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private snackBarService: MatSnackBar,
        private amplifyService: AmplifyService,
        public dialog: MatDialog
    ) {
  }

    ngOnInit(): void {
    }

    async onSubmit(form: NgForm) {
    if(!this.validationMode) {
      console.log(this.form.value);
      this.submitted = true;
      this.loading = true;

      try {
         this.authService.register(this.form.controls.username.value,
          this.form.controls.password.value,
          this.form.controls.email.value);

         this.loading = false;
         this.validationMode = true;
      } catch (error) {
        console.log('error signing up:', error);
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
            errMsg = 'Benutzernamwe wird schon verwendet';
            break;
        }

        this.snackBarService.open('Fehler beim Registrieren: ' + errMsg, 'Schliessen', {
          duration: 3000,
          panelClass: ['snackbar-error']

        });
      }
    }else {
      // Validation
      const verificationCode = this.form.controls.code.value;
      this.authService.verify(this.user.username, verificationCode.toString()).then( () => {
          this.router.navigate(['/login']).then((navigated: boolean) => {
            if (navigated) {
              this.snackBarService.open('Benutzer Registrierung abgeschlossen', 'Schliessen', {
                duration: 3000
              });
            }
          });
        }
      );
    }
    }
}
