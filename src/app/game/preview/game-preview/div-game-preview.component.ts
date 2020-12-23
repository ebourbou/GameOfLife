import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../model/Game';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRatingChanged($event: any): void {
    // todo
  }

  doNavigate(): void {
    if (this.navigationEnabled) {
      this.router.navigate(['/game'], { queryParams: { id: this.game.id } });
    }
  }
}
