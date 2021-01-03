import 'jasmine';
import { async, ComponentFixture, fakeAsync, inject, TestBed, TestBedStatic, tick } from '@angular/core/testing';
import { UserService } from '../users/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AmplifyService, FormComponent } from 'aws-amplify-angular';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../shared/service/notification.service';
import { AuthServiceMock } from '../core/services/auth.service.mock';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { By } from 'protractor';

class RouterStub {
  navigateByUrl(url: string): string {
    return url;
  }
}

describe('Component: Account', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debug: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    const MockAmplifyService = TestBed.configureTestingModule({ providers: [AmplifyService] });
    const MockNotificationService = TestBed.configureTestingModule({ providers: [NotificationService] });
    const MockUserService = TestBed.configureTestingModule({ providers: [UserService] });

    const activatedRouteStub = {
      paramMap: {
        subscribe() {
          return of();
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserModule, FormsModule],
      providers: [
        { provide: AmplifyService, userClass: MockAmplifyService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: { returnUrl: '' } } } },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: RouterStub },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        //   debug = fixture.debugElement.query(By.css('form'));
        //   el = debug.nativeElement;
      });
  }));

  it('testing form the proper way', fakeAsync(() => {
    // This first detectChanges is necessary to properly set up the form
    fixture.detectChanges();

    // Tick needs to be called in order for form controls to be registered properly.
    tick();
    component.form.controls.username.setValue('user');
    component.form.controls.password.setValue('wrong_password');
  }));
});
