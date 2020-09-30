import {Component, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EventEmitter} from 'events';
import {Pattern} from '../_models/pattern';
import {PatternDetailComponent} from './pattern-detail.component';
import {PatternList} from './patterns-list';
import {APIService} from '../API.service';


@Component({ selector: 'app-pattern-list', templateUrl: 'pattern-overview.component.html', styleUrls: ['pattern-overview.component.scss']  })
export class PatternOverviewComponent implements OnInit {
    public patterns;

    constructor(
        private apiService: APIService,
        private route: ActivatedRoute,
        private snackBarService: MatSnackBar
    ) { }

    ngOnInit(): void {
      /*  if (this.patterns && this.patterns.length > 0) {
          this.currentPattern = this.patterns[0];
          this.rowClick.emit(this.currentPattern);
        }*/
      this.apiService.ListPatterns().then(
        value => {
          value.items.forEach(item => {
            this.patterns.push(item);
          });
        }
      );
    }

    onSubmit(): void {
    }

  public onSelect(pattern: Pattern): void {
   // this.rowClick.emit(pattern);

  }

}
