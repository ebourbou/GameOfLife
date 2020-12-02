import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Game } from '../model/Game';

@Component({
  selector: 'game-preview',
  templateUrl: './game.preview.component.html',
  styleUrls: ['./game.preview.component.scss'],
})
export class GamePreviewComponent implements AfterViewInit {
  @Input() game: Game;
  @ViewChild('gamePreview') gamePreviewCanvas: ElementRef;
  private context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.gamePreviewCanvas.nativeElement.getContext('2d');
    this.draw();
  }

  onResize() {
    // Not a good thing to do but will get you going.
    // I need to look into the Renderer service instead.
    const canvasElement = this.gamePreviewCanvas.nativeElement;

    // These don't change (canvas intrinsic dimensions)
    const canvasWidth = canvasElement.width;
    const canvasHeight = canvasElement.height;

    // These will change (scaling applied by the style)
    const computedStyles = getComputedStyle(canvasElement);
    const computedWidth = computedStyles.width;
    const computedHeight = computedStyles.height;
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
      this.context.fillStyle = 'azure';
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

  onRatingChanged($event: any) {
    // todo
  }
}
