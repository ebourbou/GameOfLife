import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { BreakpointService } from './breakpoint.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { Orientation } from './orientation.enum';

describe('BreakpointService', () => {
  let service: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    service = TestBed.inject(BreakpointService);
    expect(TestBed.inject(BreakpointService)).toBeTruthy();
  });

  it(
    'should interpret portrait correctly',
    waitForAsync(() => {
      const fakeBreakpointObserver = { observe: () => of({ breakpoints: { [Breakpoints.WebPortrait]: true }, matches: true }) };
      service = new BreakpointService((fakeBreakpointObserver as unknown) as BreakpointObserver);

      service.subscribeToOrientationChanges().subscribe((orientation) => {
        expect(orientation).toBe(Orientation.PORTRAIT);
      });
    })
  );

  it(
    'should interpret landscape correctly',
    waitForAsync(() => {
      const fakeBreakpointObserver = {
        observe: () =>
          of({
            breakpoints: { [Breakpoints.HandsetLandscape]: true, [Breakpoints.TabletLandscape]: true, [Breakpoints.WebLandscape]: true },
            matches: true,
          }),
      };
      service = new BreakpointService((fakeBreakpointObserver as unknown) as BreakpointObserver);

      service.subscribeToOrientationChanges().subscribe((orientation) => {
        expect(orientation).toBe(Orientation.LANDSCAPE);
      });
    })
  );

  it(
    'should listen and react to layout changes',
    waitForAsync(() => {
      const fakeBreakpointObserver = {
        observe: () =>
          of(
            {
              breakpoints: { [Breakpoints.HandsetLandscape]: true },
              matches: true,
            },
            {
              breakpoints: { [Breakpoints.HandsetPortrait]: true },
              matches: true,
            }
          ),
      };
      service = new BreakpointService((fakeBreakpointObserver as unknown) as BreakpointObserver);

      let calls = 0;
      service.subscribeToOrientationChanges().subscribe((orientation) => {
        if (calls === 0) {
          expect(orientation).toBe(Orientation.LANDSCAPE);
          calls = 1;
        } else {
          expect(orientation).toBe(Orientation.PORTRAIT);
        }
      });
    })
  );
});
