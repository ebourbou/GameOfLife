import 'jasmine';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { UserService } from '../users/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../shared/service/notification.service';
import { AuthServiceMock } from '../core/services/auth.service.mock';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

class RouterStub {
  // noinspection JSUnusedGlobalSymbols
  navigateByUrl(url: string): string {
    return url;
  }
}

describe('Component: Account', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let debug: DebugElement;
  // let el: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      const MockAmplifyService = TestBed.configureTestingModule({ providers: [AmplifyService] });
      const MockNotificationService = TestBed.configureTestingModule({ providers: [NotificationService] });
      const MockUserService = TestBed.configureTestingModule({ providers: [UserService] });

      // noinspection JSUnusedLocalSymbols
      const activatedRouteStub = {
        paramMap: {
          subscribe(): Observable<void> {
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
        });
    })
  );

  it('form invalid when empty', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    component.form.controls.username.setValue('');
    component.form.controls.password.setValue('');
    expect(component.form.valid).toBeFalsy();
  }));
});
