import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, NgForm} from '@angular/forms';
import {Pattern} from '../../_models/pattern';


@Component({ selector: 'app-pattern-detail', templateUrl: 'pattern-detail.component.html', styleUrls: ['pattern-detail.component.scss']  })
export class PatternDetailComponent implements OnInit, OnDestroy{

  private id: string;
  patterns: Pattern[];
  private sub: any;

  @Input() pattern: Pattern;
    constructor(
        private route: ActivatedRoute,
        private snackBarService: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.id = '' + params.id;
      });
    }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
