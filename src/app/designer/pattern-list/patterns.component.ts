import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { MatListOption } from '@angular/material/list';
import { APIService } from '../../API.service';
import { PatternService } from '../../shared/service/patterns.service';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit, OnDestroy {
  patterns: Observable<Pattern[]>;
  selectedPattern: Pattern;
  user: User;
  selectedId: string;

  public pattern: Observable<Pattern>;

  constructor(
    private patternService: PatternService,
    private apiService: APIService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });

    // Subscriptions to GraphQL via websockets on create,delete & update
    this.apiService.OnCreatePatternListener.subscribe((value) => {
      this.load(null);
    });

    this.apiService.OnDeletePatternListener.subscribe((value) => {
      this.load(null);
    });

    this.apiService.OnUpdatePatternListener.subscribe((value) => {
      this.load(null);
    });
    this.load(null);
  }

  onSelect(pattern: Pattern): void {
    /*  if (pattern) {
      this.selectedPattern = pattern;
    } else {
      if (this.patterns && this.patterns.length > 0) {
        // select first
        this.selectedPattern = this.patterns[0];
      }
    }*/
  }
  onPatternSelection(select: MatListOption): void {
    this.selectedPattern = select.value;
  }

  load(selectedPattern: Pattern): void {
    this.patternService.getPatternsObservable().subscribe((value) => {
      this.patterns = of(value);
      this.selectedPattern = value.length > 0 ? (this.selectedPattern = value[0]) : null;
      this.onSelect(selectedPattern);
    });

    this.patterns.subscribe((value) => {});
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
