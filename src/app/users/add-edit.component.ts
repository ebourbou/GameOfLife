import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {Role} from '../shared/model/role';
import {enumSelector} from './utils/util';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormErrorStateMatcher} from '../auth/register.component';
import { User } from '../shared/model/user';
import { AuthService } from '../core/services/auth.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    id: string;
    isAddMode: boolean;
    user: User;
    loading = false;
    submitted = false;
    roles = enumSelector(Role);
    hidePwd = true;

    matcher = new FormErrorStateMatcher();
   @ViewChild('form', { read: NgForm }) form: NgForm;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private snackBarService: MatSnackBar
    ) {}

    public ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
      this.isAddMode = !this.id;
      // password not required in edit mode
      const passwordValidators = [Validators.minLength(8)];
      if (this.isAddMode) {
            this.user = new User();
            passwordValidators.push(Validators.required);
        }
      if (!this.isAddMode) {
       /* this.authService.getById(this.id)
                .pipe(first())
                .subscribe(data => {
                      this.user = data;
                });*/
        }
    }

  onSubmit(form: NgForm): void {
        this.submitted = true;

        // stop here if form is invalid
        if (!this.form.valid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            // this.updateUser();
        }
    }

    private createUser(): void {
      this.authService.register(this.user.username, this.user.password, this.user.email)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['.', {relativeTo: this.route}]).then((navigated: boolean) => {
              if (navigated) {
                this.snackBarService.open('Benutzer ' + this.user.username + ' wurde angelegt.', 'Schliessen', {
                  duration: 2000,
                });
              }
            });
          },
          error => {
            this.loading = false;
          });
    }
}
