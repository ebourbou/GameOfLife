import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Pattern} from '../../_models/pattern';
import { PatternService } from '../services/patterns.service';
import { Observable } from 'rxjs';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {
  patterns$: Observable<Pattern[]>;
  selectedPattern: Pattern;

  constructor(patternService: PatternService) {
    this.patterns$ = patternService.getPatterns();
  }

  ngOnInit(): void {
    this.onSelect(this.patterns$[0]);
  }

  onSelect(pattern: Pattern): void  {
    this.selectedPattern = pattern;
  }
}

