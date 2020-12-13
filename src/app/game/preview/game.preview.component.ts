import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from '@angular/core';
import { Game } from '../model/Game';
import { RatingComponent } from '../../shared/rating/rating.component';
import { User } from '../../shared/model/user';
import { PatternService } from '../../shared/service/patterns.service';
import { AuthService } from '../../core/services/auth.service';
import { RatingService } from '../../shared/service/rating.service';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'game-preview',
  templateUrl: './game.preview.component.html',
  styleUrls: ['./game.preview.component.scss'],
})
export class GamePreviewComponent implements OnInit, AfterViewInit {
  @Input() game: Game;
  @ViewChild('gamePreview') gamePreviewCanvas: ElementRef;
  @ViewChild('rating') ratingComponent: RatingComponent;

  private context: CanvasRenderingContext2D;
  rating: number;
  user: User;
  disabled = false;

  constructor(
    private notificationService: NotificationService,
    private ratingService: RatingService,
    private patternService: PatternService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    this.context = this.gamePreviewCanvas.nativeElement.getContext('2d');
    this.draw();
  }

  /**
   * Draws something using the context we obtained earlier on
   */
  private draw(): void {
    if (this.game && this.game.board) {
      const gameWidth = this.game.board.width;
      const gameHeight = this.game.board.height;
      const canvasWidth = (this.gamePreviewCanvas.nativeElement as HTMLCanvasElement).width;
      const canvasHeight = (this.gamePreviewCanvas.nativeElement as HTMLCanvasElement).height;

      const computedStyles = getComputedStyle(this.gamePreviewCanvas.nativeElement);
      const wi = parseInt(computedStyles.width, 10);
      const hi = parseInt(computedStyles.height, 10);

      this.context.scale(1, 1);

      this.context.fillStyle = 'ghostwhite';
      this.context.fillRect(0, 0, canvasWidth, canvasHeight);
      this.context.fillStyle = 'black';

      const cellWidth = Math.max(canvasWidth / gameWidth, 1);
      const cellHeight = Math.max(canvasHeight / gameHeight, 1);

      for (let h = 0; h < gameHeight; h++) {
        for (let w = 0; w < gameWidth; w++) {
          if (this.game.board.getCell(w, h) && this.game.board.getCell(w, h).isAlive()) {
            this.context.fillRect(w * cellWidth, h * cellHeight, cellWidth, cellHeight);
          }
        }
      }
    }
  }

  onRatingChanged(rating: number): void {
    console.log(rating);
  }
}
