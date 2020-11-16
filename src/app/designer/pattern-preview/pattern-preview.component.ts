import { ApplicationRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { Board } from '../../shared/model/Board';
import { GameUtils } from '../../shared/service/GameUtils';
import { Cell } from '../../shared/model/Cell';
import { CellState } from '../../shared/model/CellState';
import { ConwaysRuleSet } from '../rule/conway/ConwaysRuleSet';

@Component({
  selector: 'pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.scss'],
})
export class PatternPreviewComponent implements OnChanges {
  @Input() pattern: Pattern;
  board: Board = null;
  originalPattern: string;
  id: any;

  constructor() {}

  private buildCells(x: number, y: number, pattern: string): Map<number, Array<Cell>> {
    const rowsAndCells = new Map<number, Array<Cell>>();

    for (let currentRow = 0; currentRow < y; currentRow++) {
      const rowArray = new Array<Cell>();
      for (let currentCol = 0; currentCol < x; currentCol++) {
        rowArray.push(
          new Cell(
            currentRow,
            currentCol,
            pattern.charAt(currentCol + currentRow * x + currentRow) === '.' ? CellState.DEAD : CellState.ALIVE
          )
        );
      }
      rowsAndCells.set(currentRow, rowArray);
    }

    return rowsAndCells;
  }

  startAnimation(): void {
    this.id = setInterval(() => {
      this.play();
    }, 500);
  }

  stopAnimation(): void {
    clearInterval(this.id);
    // restore original pattern
    this.pattern.pattern = this.originalPattern;
    this.ngOnChanges(null);
  }
  play(): void {
    this.board.nextGeneration(new ConwaysRuleSet());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pattern) {
      this.originalPattern = JSON.parse(JSON.stringify(this.pattern.pattern));
      const x = this.pattern.sizeX;
      const y = this.pattern.sizeY;

      this.board = GameUtils.buildBoardWithPattern(x, y, this.pattern.pattern);
    }
  }
}
