import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {Pattern} from '../../shared/model/pattern';
import { PatternService } from '../services/patterns.service';
import { EventEmitter } from 'events';
import { MatListOption } from '@angular/material/list';
import { APIService } from '../../API.service';
import { PatternUtils } from '../util/pattern-util';
import { PatternDetailComponent } from '../pattern-detail/pattern-detail.component';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit, OnChanges {
  patterns: Pattern[];
  selectedPattern: Pattern;
  private _patternService: PatternService;

  @Output()
  public select = new EventEmitter();
  private apiService: APIService;

  constructor(patternService: PatternService,
              apiService: APIService
  ){
    this.apiService = apiService;
    this._patternService = patternService;
  }

  ngOnInit(): void {
    // Subscriptions to GraphQL via websockets on cerate,delete & update
    this.apiService.OnCreatePatternListener.subscribe(pattern => {
      this.patterns.push(PatternUtils.convertPattern(pattern));
      }
    );
    this.apiService.OnDeletePatternListener.subscribe(pattern => {
      const patternToDelete: Pattern = PatternUtils.convertPattern(pattern);
      const foundIndex = this.patterns.findIndex(x => x.id === patternToDelete.id);
      this.patterns.splice(foundIndex, 1);
      }
    );

    this.apiService.OnUpdatePatternListener.subscribe(pattern => {
        const patternToUpdate: Pattern = PatternUtils.convertPattern(pattern);
        const foundIndex = this.patterns.findIndex(x => x.id === patternToUpdate.id);
        this.patterns[foundIndex] = patternToUpdate;
      }
    );

    this.load(null);
  }

  onSelect(pattern: Pattern): void  {
    if (pattern){
      this.selectedPattern = pattern;
    }else {
      if (this.patterns && this.patterns.length > 0){
        // select first
        this.selectedPattern = this.patterns[0];
      }
    }

  }
  onPatternSelection(select: MatListOption): void{
    this.selectedPattern = select.value;
  }

  async load(selectedPattern: Pattern) {

    console.log("Loading");
    this.patterns = await this._patternService.getPatterns();
    console.log("Reloaded"+ this.patterns?.length);
    this.selectedPattern = selectedPattern ? selectedPattern : (this.patterns.length > 0 ? this.patterns[0] : null);
    this.onSelect(selectedPattern);
    /*
      error => {
        console.log("Error handling");
      },
      () => {
        console.log("Reloaded");
        this.selectedPattern = selectedPattern ? selectedPattern : (this.patterns.length > 0 ? this.patterns[0] : null);
        this.onSelect(selectedPattern);
      }
    );*/
    console.log("load done. " + this.selectedPattern?.name + " patterns" + this.patterns.length);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes:"+changes);
  }
}

