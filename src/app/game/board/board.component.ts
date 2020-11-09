import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../model/Board';
import { Pattern } from '../../shared/model/pattern';
import { Cell } from '../../shared/model/Cell';
import { GameUtils } from '../util/GameUtils';
import { patternSelected } from '../state/game.actions';

@Component({
  selector: 'gol-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input()
  public board: Board;

  @Input()
  patternSelected: Pattern;

  @Output()
  public doApplyPattern: EventEmitter<Cell> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onApplyPattern(centerCell: Cell): void {
    this.doApplyPattern.emit(centerCell);
  }
}
