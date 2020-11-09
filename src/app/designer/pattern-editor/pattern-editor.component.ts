import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cell } from '../../shared/model/Cell';
import { CellState } from '../../shared/model/CellState';
import { Board } from '../../game/model/Board';

@Component({
  selector: 'app-pattern-editor',
  templateUrl: './pattern-editor.component.html',
  styleUrls: ['./pattern-editor.component.scss'],
})
export class PatternEditorComponent implements OnChanges {
  @Input() sizeX: number;
  @Input() sizeY: number;
  board: Board = null;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sizeX && this.sizeY) {
      console.log(this.sizeY + ' ' + this.sizeX);
      this.board = new Board(this.sizeX, this.sizeY, this.buildCells(this.sizeX, this.sizeY));
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
}
