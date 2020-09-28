import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import { AuthService } from '../_services';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {PatternList} from './patterns-list';
import {Pattern} from '../_models/pattern';

@Component({ templateUrl: 'layout.component.html', styleUrls: ['layout.component.scss']})
export class LayoutComponent {

  showSideNav$: Observable<boolean>;

  patterns = PatternList;
  selectedPattern: Event;
  constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
      this.onShowSideNav();
    }

  onRowClick(id: any) {
    this.router.navigate(['pattern', id]);
  }
  closeDetails() {
    this.router.navigate(['.'], {relativeTo: this.route.parent});
  }
  onShowSideNav() {
    this.showSideNav$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      switchMap(_ => {
        return this.route.firstChild ?
          this.route.firstChild.params :
          of(false);
      }),
      map(params => !!params)
    );
  }
}
