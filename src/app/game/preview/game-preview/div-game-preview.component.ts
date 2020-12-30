import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/service/notification.service';
import { RatingService } from '../../../shared/service/rating.service';
import { PatternService } from '../../../shared/service/patterns.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/model/user';

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

  constructor(
    private notificationService: NotificationService,
    private ratingService: RatingService,
    private patternService: PatternService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  doNavigate(): void {
    if (this.navigationEnabled) {
      this.router.navigate(['/game/play'], { queryParams: { id: this.game.id } });
    }
  }
}
