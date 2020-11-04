import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { Role } from '../../shared/model/role';
import { UserUtils } from '../utils/user-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../services/users.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    id: string;
    user: User = null;
    loading = false;
    submitted = false;
    roles = UserUtils.enumSelector(Role);

   @ViewChild('form', { read: NgForm }) form: NgForm;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private snackBarService: MatSnackBar
    ) {}

    public ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
      this.userService.getUser(this.id).then(value =>
        this.user = UserUtils.fromAws(value));
    }

  onSubmit(user : User): void {
        this.submitted = true;

        // stop here if form is invalid
        if (!this.form.valid) {
            return;
        }

        this.loading = true;
        this.userService.updateUser(user).then((value) => (
          this.snackBarService.open('Benutzer ' + this.user.username + ' wurde aktualisiert.',
            'Schliessen', {duration: 2000})
        ));
        this.loading = false;
    }
/*
    private createUser(user: User): void {
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
    }*/
}
