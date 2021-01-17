import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../model/game';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/model/user';
import { BreakpointService } from '../../shared/service/breakpoint.service';
import { ScreenSize } from '../../shared/service/screen-size.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview-using-board.component.html',
  styleUrls: ['./game-preview-using-board.component.scss'],
})
export class GamePreviewUsingBoardComponent implements OnInit, OnDestroy {
  @Input()
  game: Game;

  @Input()
  navigationEnabled = false;
  user: User;

  isHandSet: boolean;

  private breakpointSubscription: Subscription;
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private breakpointService: BreakpointService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.breakpointSubscription = this.breakpointService
      .subscribeToScreenSizeChanges()
      .subscribe((s) => (this.isHandSet = s === ScreenSize.HANDSET));
  }

  doNavigate(): void {
    if (this.navigationEnabled) {
      this.router.navigate(['/game/play'], { queryParams: { id: this.game.id } }).then(() => null);
    }
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }
}
