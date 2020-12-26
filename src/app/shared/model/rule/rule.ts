import { Cell } from '../cell';

export interface Rule {
  readonly description: string;

  doesMatch(cell: Cell): boolean;

  apply(cell: Cell): void;
}
