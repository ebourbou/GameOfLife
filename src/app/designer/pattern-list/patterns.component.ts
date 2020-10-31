import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Pattern} from '../../shared/model/pattern';
import { PatternService } from '../services/patterns.service';
import { async, Observable } from 'rxjs';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {
  patterns$: Observable<Pattern[]>;
  selectedPattern: Pattern;
  private _patternService: PatternService;

  @Output()
  public select = new EventEmitter();

  constructor(patternService: PatternService) {
    this._patternService = patternService;
  }

  ngOnInit(): void {
    this.reload();
  }

  onSelect(pattern: Pattern): void  {
    this.selectedPattern = pattern;
  }

  reload(): void {
    this.patterns$ = this._patternService.getPatterns();
  }

  selectPattern(pattern): void {
    if (!pattern){
      // select first
      this.patterns$.subscribe(data => this.selectedPattern = data[0]);
      console.log('Select' + this.selectedPattern);
      this.onSelect(this.selectedPattern);
    }else {
      this.onSelect(pattern);
    }
  }
}

