import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Cell } from '../../shared/model/Cell';
import { CellState } from '../../shared/model/CellState';
import { Board } from '../../game/model/Board';
import { GameUtils } from '../../game/util/GameUtils';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pattern-editor',
  templateUrl: './pattern-editor.component.html',
  styleUrls: ['./pattern-editor.component.scss'],
})
export class PatternEditorComponent implements OnChanges, OnDestroy {
  @Input() sizeX: number;
  @Input() sizeY: number;
  @Input() pattern: string;
  @Input() form: NgForm;

  board: Board = null;

  constructor() {}

  ngOnDestroy(): void {
    console.log('Saving pattern');
    this.save();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sizeX && this.sizeY) {
      console.log('Pattern changed: ' + this.sizeY + ' ' + this.sizeX + ' ' + this.pattern);
      this.board = new Board(this.sizeX, this.sizeY, this.buildCells(this.sizeX, this.sizeY));
      this.load();
    }
  }

  private buildCells(x: number, y: number): Map<number, Array<Cell>> {
    const rowsAndCells = new Map<number, Array<Cell>>();

    for (let currentRow = 0; currentRow < y; currentRow++) {
      const rowArray = new Array<Cell>();
      for (let currentCol = 0; currentCol < x; currentCol++) {
        rowArray.push(new Cell(currentRow, currentCol, CellState.ALIVE));
      }
      rowsAndCells.set(currentRow, rowArray);
    }
    return rowsAndCells;
  }

  private randomState(): CellState {
    if (Math.round(Math.random() * 100) > 10) {
      return CellState.DEAD;
    } else {
      return CellState.ALIVE;
    }
  }

  public save(): string {
    this.pattern = GameUtils.save(this.board);
    return this.pattern;
  }

  public load(): void {
    GameUtils.load(this.board, this.pattern);
  }

  toggle(x: number, y: number): void {
    this.form.form.markAsDirty();
    this.board.getCell(x, y).switchState();
  }
}
