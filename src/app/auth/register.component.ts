import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService} from '../_services';
import {User} from '../_models';
import {ErrorStateMatcher} from '@angular/material/core';

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

    usernameFormControl = new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),

    ]);
    passwordFormControl = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
       ]);
    emailFormControl = new FormControl('',[
      Validators.required,
      Validators.email]);

  @ViewChild('form', { static: true }) form: NgForm;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
  }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm): void {
      console.log(this.form.value);
      this.submitted = true;
      this.loading = true;
      this.authService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.loading = false;
                });
    }
}
