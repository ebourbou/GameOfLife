import { Cell } from '../../model/cell';
import { CellState } from '../../model/cell-state';
import { AbstractRule } from '../../model/rule/abstract-rule';

export class GenericSurviveRule extends AbstractRule {
  private neighbours: number[];
  constructor(neighbours: number[]) {
    super('Eine lebende Zelle mit ' + neighbours.join(',') + ' lebenden Nachbarn bleibt am Leben.');
    this.neighbours = neighbours;
  }

  doesMatch(cell: Cell): boolean {
    return cell.isAlive() && this.neighbours.includes(cell.livingNeighbours());
  }

  apply(cell: Cell): void {
    this.doesMatchOrThrowError(cell);
    cell.nextState = CellState.ALIVE;
  }
}
