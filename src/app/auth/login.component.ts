import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services';
import {User} from '../_models';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, NgForm} from '@angular/forms';

/*
 TODO:  password confirm field
 */

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss']  })
export class LoginComponent implements OnInit {
    user = new User();
    public loginInvalid: boolean;
    loading = false;
    hidePwd = true;
    submitted = false;
    returnUrl: string;

    @ViewChild(NgForm) ngForm: NgForm;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private snackBarService: MatSnackBar
    ) { }

    ngOnInit(): void {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    onSubmit(): void {
      this.loginInvalid = false;
      this.submitted = true;

      this.loading = true;
      this.authService.login(this.ngForm.value.username, this.ngForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                  this.router.navigate([this.returnUrl]).then((navigated: boolean) => {
                    if (navigated) {
                      this.snackBarService.open('Willkommen zurück ' + data.username, 'Schliessen', {
                        duration: 2000
                      });
                    }
                  });
                },
                error => {
                    this.loading = false;
                });
    }
}
