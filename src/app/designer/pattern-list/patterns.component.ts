import { Component, OnInit, Output } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { EventEmitter } from 'events';
import { MatListOption } from '@angular/material/list';
import { APIService } from '../../API.service';
import { PatternUtils } from '../util/pattern-util';
import { PatternService } from '../../shared/service/patterns.service';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit {
  patterns: Pattern[];
  selectedPattern: Pattern;
  user: User;

  private _patternService: PatternService;

  @Output()
  public select = new EventEmitter();
  private apiService: APIService;
  private authService: AuthService;

  constructor(patternService: PatternService, apiService: APIService, authService: AuthService) {
    this.apiService = apiService;
    this._patternService = patternService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });

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
      this.patterns = result.items.map((item) => {
        return PatternUtils.fromAwsPattern(item);
      });
      this.selectedPattern = selectedPattern ? selectedPattern : this.patterns.length > 0 ? this.patterns[0] : null;
      this.onSelect(selectedPattern);
    });
  }

  lockedIcon(pattern: Pattern): 'lock' | 'lock_open' {
    return pattern.locked ? 'lock' : 'lock_open';
  }
}
