import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, NgForm} from '@angular/forms';
import {Pattern} from '../_models/pattern';
import {map} from 'rxjs/operators';
import {PatternList} from './patterns-list';
import {PatternOverviewComponent} from './pattern-overview.component';


@Component({ selector: 'app-pattern-detail', templateUrl: 'pattern-detail.component.html', styleUrls: ['pattern-detail.component.scss']  })
export class PatternDetailComponent implements OnInit {

    private pattern: Pattern;
    @Input() setPattern(pattern: Pattern) {
      this.pattern = pattern;
    }

   // @ViewChild(NgForm) ngForm: NgForm;

    constructor(
        private route: ActivatedRoute,
        private snackBarService: MatSnackBar
    ) { }

    ngOnInit(): void {
        // get return url from route parameters or default to '/'
       // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }
}
