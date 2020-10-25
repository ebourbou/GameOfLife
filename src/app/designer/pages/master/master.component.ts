import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pattern, PatternState} from '../../state';
import * as fromPatternStore from '../../state';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

 // public routeChangeSub$: Subscription;
  public pattern$: Observable<Pattern>;
  public patterns$: Observable<Pattern[]>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private store: Store<PatternState>

  ){}

   ngOnInit() {

    // this.pattern$ = this.store.pipe(select(fromPatternStore.getSelectedPattern));
   // const id = this.route.snapshot.params.id;
  //  this.patterns$ = await this.store.pipe(select(fromPatternStore.getAllPatterns));

    this.store.dispatch(fromPatternStore.loadAllPatterns());
    // this.patterns$ =  this.store.pipe(select(fromPatternStore.getAllPatterns));
    console.log('ALL: ' + this.patterns$);
    //  this.store.dispatch(fromPatternStore.loadSinglePattern({ payload: id }));

  }

  ngOnDestroy(): void {
 //   this.routeChangeSub$.unsubscribe();
  }

 /* getRouteParams(map: ParamMap): number {
    const patternId = map.get('id');
    let id: number = null;
    if (patternId) {
      this.pattern$ = this.store.pipe(
        select(fromPatternStore, { id: patternId })
      );
      id = parseInt(patternId, 10);
    }
    return id;
  }

  private readPatternsState() {
    this.store.select(getAllPatterns)
      .subscribe(patterns => {
        this.patterns$ = patterns;
      });
  }*/

}
