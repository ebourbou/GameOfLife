import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService, AuthService} from '../_services';

@Component({ templateUrl: 'register.component.html', styleUrls: ['register.component.scss'] })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', Validators.required,  Validators.pattern('[^ @]*@[^ @]*')],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
        });
    }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit(): void {

      console.log("Register");
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        //if (this.form.invalid) {
      //    return;
      //}

        this.loading = true;
        this.authService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registrierung erfolgreich', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
