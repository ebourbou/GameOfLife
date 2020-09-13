import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService, AlertService } from '../_services';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss']  })
export class LoginComponent implements OnInit {
    form: FormGroup;
    public loginInvalid: boolean;
    loading = false;
    hide = true;
    submitted = false;
    returnUrl: string;
    loginFormControl = new FormControl('', [
      Validators.required
    ]);


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
           username: ['', [Validators.required]],
           password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit(): void {

      if (!(this.form.dirty && this.form.valid)) {
        return;
      }
      this.loginInvalid = false;
      this.submitted = true;

        // reset alerts on submit
      this.alertService.clear();

      console.log('auth');
      this.loading = true;
      this.authService.login(this.form.value.username, this.form.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
