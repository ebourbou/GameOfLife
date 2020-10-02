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
    private patterns = [];

  @Input() selected: Pattern;
  @Output() selectedChange: EventEmitter = new EventEmitter();

    constructor(
        private apiService: APIService
    ) { }

    ngOnInit(): void {
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
}
