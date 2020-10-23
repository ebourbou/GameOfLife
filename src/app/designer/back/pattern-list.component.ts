import {Component, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EventEmitter} from 'events';
import {Pattern} from '../../_models/pattern';
import {APIService} from '../../API.service';


@Component({ selector: 'app-pattern-list', templateUrl: 'pattern-list.component.html', styleUrls: ['pattern-list.component.scss']  })
export class PatternListComponent implements OnInit {
   patterns = [];

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
      if (this.patterns && this.patterns.length > 0){
        this.selectedChange.emit(this.patterns[0]);
      }

    }

    onSubmit(): void {
    }
}
