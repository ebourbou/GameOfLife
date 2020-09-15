import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService, AuthService} from '../_services';
import {Role} from '../_models/role';
import {enumSelector} from '../_helpers/util';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    roles = enumSelector(Role);
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private snackBarService: MatSnackBar
    ) {   }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(8)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
            role: ['', Validators.required],
            password: ['', passwordValidators]
        });

        if (!this.isAddMode) {
            this.authService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.email.setValue(x.email);
                    this.f.role.setValue(x.role),
                    this.f.username.setValue(x.username);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    get password() {
      return this.form.get('password');
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.authService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.alertService.success('Benutzer erfolh added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]).then((navigated: boolean) => {
                      if (navigated) {
                        this.snackBarService.open('Benutzer ' + this.form.get('username').value + ' wurde angelegt.', 'Schliessen',  {
                          duration: 2000,
                        });
                      }
                    });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateUser() {
      console.log('Update ' + this.form.get('role').value);
      this.authService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]).then((navigated: boolean) => {
                      if (navigated) {
                        this.snackBarService.open('Benutzer ' + this.form.get('username').value + ' wurde gespeichert.', 'Schliessen',  {
                          duration: 2000,
                        });
                      }
                  });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

  }
}
