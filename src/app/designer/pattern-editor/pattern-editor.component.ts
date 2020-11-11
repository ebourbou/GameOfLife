import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Cell } from '../../shared/model/Cell';
import { CellState } from '../../shared/model/CellState';
import { Board } from '../../game/model/Board';
import { GameUtils } from '../../game/util/GameUtils';
import { NgForm } from '@angular/forms';
import { PatternUtils } from '../util/pattern-util';

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
  @Input() isErase: boolean;

  board: Board = null;

  constructor() {
    // Start in "Pen" mode
    this.isErase = false;
  }

  ngOnDestroy(): void {
    console.log('Saving pattern');
    this.save();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sizeX && this.sizeY) {
      console.log('Changed');
      this.board = new Board(this.sizeX, this.sizeY, this.buildCells(this.sizeX, this.sizeY));
      if (this.pattern) {
        this.load();
      }
    }
  }

  invert(): void {
    this.form.form.markAsDirty();
    this.pattern = this.save();
    this.pattern = PatternUtils.invert(this.pattern);
    this.board = new Board(this.sizeX, this.sizeY, this.buildCells(this.sizeX, this.sizeY));
    this.load();
  }

  clear(): void {
    this.form.form.markAsDirty();
    let emptyPattern = '';
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        emptyPattern += '.';
      }
      emptyPattern += '\n';
    }
    this.pattern = emptyPattern.slice(0, -1);
    this.board = new Board(this.sizeX, this.sizeY, this.buildCells(this.sizeX, this.sizeY));
  }

  private buildCells(x: number, y: number): Map<number, Array<Cell>> {
    const rowsAndCells = new Map<number, Array<Cell>>();

    for (let currentRow = 0; currentRow < y; currentRow++) {
      const rowArray = new Array<Cell>();
      for (let currentCol = 0; currentCol < x; currentCol++) {
        rowArray.push(new Cell(currentRow, currentCol, CellState.DEAD));
      }
      rowsAndCells.set(currentRow, rowArray);
    }
    return rowsAndCells;
  }

  public save(): string {
    this.pattern = GameUtils.save(this.board);
    return this.pattern;
  }

  public load(pattern: string = null): void {
    if (pattern) {
      this.pattern = pattern;
    }
    GameUtils.load(this.board, this.pattern);
  }

  toggle(x: number, y: number, event: MouseEvent = null): void {
    if (event == null || event.buttons > 0) {
      this.form.form.markAsDirty();
      this.board.getCell(x, y).setState(this.isErase ? CellState.DEAD : CellState.ALIVE);
    }
  }

  get tool(): 'format_color_reset' | 'brush' {
    return this.isErase ? 'format_color_reset' : 'brush';
  }
}
