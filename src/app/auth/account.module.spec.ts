import 'jasmine';
import { async, inject, TestBed, TestBedStatic } from '@angular/core/testing';
import { UserService } from '../users/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../shared/service/notification.service';
import { AuthServiceMock } from '../core/services/auth.service.mock';
import { BehaviorSubject, of } from 'rxjs';

class RouterStub {
  navigateByUrl(url: string): string {
    return url;
  }
}

describe('Component: Account', () => {
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
      imports: [FormsModule],
      providers: [
        { provide: AmplifyService, userClass: MockAmplifyService },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useClass: Router },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: RouterStub },
      ],
    });
  }));
  it('should create an instance', inject(
    [Router, UserService],
    (
      amplifyService: AmplifyService,
      activatedRoute: ActivatedRoute,
      router: Router,
      authService: AuthService,
      notificationService: NotificationService
    ) => {
      const component = new LoginComponent(amplifyService, activatedRoute, router, authService, notificationService);

      expect(component).toBeTruthy();
    }
  ));
});

describe('when the login page loads', () => {
  it('then the login name should be defaulted', inject(
    [AmplifyService, ActivatedRoute, Router, AuthService, NotificationService],
    (
      amplifyService: AmplifyService,
      activatedRoute: ActivatedRoute,
      router: Router,
      authService: AuthService,
      notificationService: NotificationService
    ) => {
      const component = new LoginComponent(amplifyService, activatedRoute, router, authService, notificationService);
      component.ngOnInit();

      it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
      });

      component.form.controls.login.setValue('user');
      component.form.controls.password.setValue('wrong_password');

      // expect(component.form.login.username).toEqual('');
    }
  ));
});
/*  ));
     it('then the error message should not be displayed', inject([Router, UserService], (router: Router, userService: UserService) => {
        let component = new LoginComponent(router, userService);
        expect(component.showErrorMessage).toBe(false);
      }));
});

describe('when a valid username and password are entered', () => {
    it('then the home route should be displayed', inject([Router, UserService], (router: Router, userService: UserService) => {
      spyOn(userService, 'login').and.returnValue(Observable.of(true));
      spyOn(router, 'navigateByUrl').and.returnValue('');
      let component = new LoginComponent(router, userService);
      component.authenticateUser();
      expect(router.navigateByUrl).toHaveBeenCalled();
    }));
  });
  describe('when an invalid username and password are entered', () => {
    it('then Login Failed should be displayed', inject([Router, UserService], (router: Router, userService: UserService) => {
      spyOn(userService, 'login').and.returnValue(Observable.of(false));
      spyOn(router, 'navigateByUrl').and.returnValue('');
      let component = new LoginComponent(router, userService);
      component.authenticateUser();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      expect(component.showErrorMessage).toBe(true);
    }));
  });

*/
