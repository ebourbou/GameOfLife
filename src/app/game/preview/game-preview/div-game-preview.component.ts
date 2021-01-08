import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/model/user';
import { BreakpointService } from '../../../shared/service/breakpoint.service';
import { ScreenSize } from '../../../shared/service/screen-size.enum';

@Component({
  selector: 'app-game-preview',
  templateUrl: './div-game-preview.component.html',
  styleUrls: ['./div-game-preview.component.scss'],
})
export class DivGamePreviewComponent implements OnInit {
  @Input()
  game: Game;

  @Input()
  navigationEnabled = false;
  private user: User;

  isHandSet: boolean;

  constructor(private authService: AuthService, private breakpointService: BreakpointService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.breakpointService.subscribeToScreenSizeChanges().subscribe((s) => (this.isHandSet = s === ScreenSize.HANDSET));
  }

  doNavigate(): void {
    if (this.navigationEnabled) {
      this.router.navigate(['/game/play'], { queryParams: { id: this.game.id } });
    }
  }
}
