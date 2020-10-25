import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {Pattern, PatternState} from '../../state';
import * as fromPatternStore from '../../state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  public routeChangeSub$: Subscription;
  public pattern$: Observable<Pattern>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private store: Store<PatternState>) {

  }

  ngOnInit(): void {
    /* ------------------------------------------------- */
    /* Listen for changes in the route, then highlight   */
    /* the selected item in the list...                  */
    /* ------------------------------------------------- */
    this.routeChangeSub$ = this.route.paramMap
      .subscribe(map =>
        this.getRouteParams(map));
  }

  ngOnDestroy(): void {
    this.routeChangeSub$.unsubscribe();
  }

  getRouteParams(map: ParamMap): number {
    const patternId = map.get('id');
    let id: number = null;
    if (patternId) {
      this.pattern$ = this.store.pipe(
        select(fromPatternStore.getSelectedPattern, { id: patternId })
      );
      id = parseInt(patternId, 10);
    }
    return id;
  }

}
