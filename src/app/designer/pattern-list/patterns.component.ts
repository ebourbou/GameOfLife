import { Component, OnInit, Output } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { EventEmitter } from 'events';
import { MatListOption } from '@angular/material/list';
import { APIService } from '../../API.service';
import { PatternUtils } from '../util/pattern-util';
import { PatternService } from '../services/patterns.service';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit {
  patterns: Pattern[];
  selectedPattern: Pattern;

  private _patternService: PatternService;

  @Output()
  public select = new EventEmitter();
  private apiService: APIService;

  constructor(patternService: PatternService, apiService: APIService) {
    this.apiService = apiService;
    this._patternService = patternService;
  }

  ngOnInit(): void {
    // Subscriptions to GraphQL via websockets on create,delete & update
    this.apiService.OnCreatePatternListener.subscribe((value) => {
      console.log('create (subscription)');
      /* const patternCreated: Pattern =  PatternUtils.fromAwsPattern(value);
       this.patterns.push(patternCreated);
       this.onSelect(patternCreated);*/
      this.load(null);
    });

    this.apiService.OnDeletePatternListener.subscribe((value) => {
      console.log('delete (subscription)');
      /*  const patternToDelete: Pattern = PatternUtils.fromAwsPattern(value);
        const foundIndex = this.patterns.findIndex(x => x.id === patternToDelete.id);
        this.patterns.splice(foundIndex, 1);
        //this.onSelect(null);*/
      this.load(null);
    });

    this.apiService.OnUpdatePatternListener.subscribe((value) => {
      console.log('update (subscription)' + value);
      const patternToUpdate: Pattern = PatternUtils.fromAwsPattern(value);
      /*  console.log("updated pattern"+ JSON.stringify(patternToUpdate));
         const foundIndex = this.patterns.findIndex(x => x.id === patternToUpdate.id);
         this.patterns[foundIndex] = patternToUpdate;
         this.selectedPattern = patternToUpdate;*/
      this.load(null);
    });
    this.load(null);
  }

  onSelect(pattern: Pattern): void {
    if (pattern) {
      this.selectedPattern = pattern;
    } else {
      if (this.patterns && this.patterns.length > 0) {
        // select first
        this.selectedPattern = this.patterns[0];
      }
    }
  }
  onPatternSelection(select: MatListOption): void {
    this.selectedPattern = select.value;
  }

  load(selectedPattern: Pattern): void {
    this._patternService.getPatterns().then((result) => {
      this.patterns = result.items.map(function (item) {
        return PatternUtils.fromAwsPattern(item);
      });
      this.selectedPattern = selectedPattern ? selectedPattern : this.patterns.length > 0 ? this.patterns[0] : null;
      this.onSelect(selectedPattern);
    });
  }
}
