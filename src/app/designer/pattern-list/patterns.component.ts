import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { EventEmitter } from 'events';
import { MatListOption } from '@angular/material/list';
import { APIService } from '../../API.service';
import { PatternUtils } from '../util/pattern-util';
import { PatternService } from '../../shared/service/patterns.service';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit, OnDestroy {
  patterns: Pattern[];
  selectedPattern: Pattern;
  user: User;

  public pattern: Observable<Pattern>;

  @Output()
  public select = new EventEmitter();

  constructor(private patternService: PatternService, private apiService: APIService, private authService: AuthService) {}

  ngOnDestroy(): void {}

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
      /*  const patternToDelete: Pattern = PatternUtils.fromAwsPattern(value);
        const foundIndex = this.patterns.findIndex(x => x.id === patternToDelete.id);
        this.patterns.splice(foundIndex, 1);
        //this.onSelect(null);*/
      this.load(null);
    });

    this.apiService.OnUpdatePatternListener.subscribe((value) => {
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
    this.patternService.getPatternsObservable().subscribe((result) => {
      this.patterns = result;
      this.selectedPattern = this.patterns.length > 0 ? this.patterns[0] : null;
      this.onSelect(selectedPattern);
    });
  }

  lockedIcon(locked: boolean): string {
    return locked ? 'lock' : 'lock_open';
  }

  typeIcon(type: string): string {
    switch (type) {
      case 'oscillator':
        return 'oscillator';
      case 'buffer':
        return 'buffer';
      case 'static':
        return 'static';
      case 'spaceship':
        return 'spaceship';
      default:
        return 'pattern';
    }
  }
}
