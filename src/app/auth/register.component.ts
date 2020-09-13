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
            email: ['', Validators.required, Validators.email],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
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
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
