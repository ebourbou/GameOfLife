import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { Orientation } from './orientation.enum';
import { ScreenSize } from './screen-size.enum';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  private subscribeToLayoutChanges(): Observable<BreakpointState> {
    return this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait,
    ]);
  }

  subscribeToScreenSizeChanges(): Observable<ScreenSize> {
    return this.subscribeToLayoutChanges().pipe(map((e) => this.translateSize(e)));
  }

  subscribeToOrientationChanges(): Observable<Orientation> {
    return this.subscribeToLayoutChanges().pipe(map((e) => this.translateOrientation(e)));
  }

  translateOrientation(breakpoint: BreakpointState): Orientation {
    let orientation = Orientation.LANDSCAPE;
    if (
      breakpoint.breakpoints[Breakpoints.WebPortrait] ||
      breakpoint.breakpoints[Breakpoints.TabletPortrait] ||
      breakpoint.breakpoints[Breakpoints.HandsetPortrait]
    ) {
      orientation = Orientation.PORTRAIT;
    }
    return orientation;
  }

  translateSize(breakpoint: BreakpointState): ScreenSize {
    let size = ScreenSize.HANDSET;
    if (breakpoint.breakpoints[Breakpoints.WebPortrait] || breakpoint.breakpoints[Breakpoints.WebLandscape]) {
      size = ScreenSize.WEB;
    } else if (breakpoint.breakpoints[Breakpoints.TabletPortrait] || breakpoint.breakpoints[Breakpoints.TabletLandscape]) {
      size = ScreenSize.TABLET;
    }
    return size;
  }
}
