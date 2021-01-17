import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { MatListOption } from '@angular/material/list';
import { APIService } from '../../API.service';
import { PatternService } from '../../shared/service/patterns.service';
import { User } from '../../shared/model/user';
import { AuthService } from '../../core/services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit, OnDestroy {
  patterns: Observable<Pattern[]>;
  selectedPattern: Pattern;
  user: User;

  public pattern: Observable<Pattern>;

  constructor(private patternService: PatternService, private apiService: APIService, private authService: AuthService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });

    // Subscriptions to GraphQL via websockets on create,delete & update
    this.apiService.OnCreatePatternListener.subscribe(() => {
      this.load();
    });

    this.apiService.OnDeletePatternListener.subscribe(() => {
      this.load();
    });

    this.apiService.OnUpdatePatternListener.subscribe(() => {
      this.load();
    });
    this.load();
  }

  onPatternSelection(select: MatListOption): void {
    this.selectedPattern = select.value;
  }

  load(): void {
    this.patternService.getPatternsObservable().subscribe((value) => {
      this.patterns = of(value);
      this.selectedPattern = value.length > 0 ? (this.selectedPattern = value[0]) : null;
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
