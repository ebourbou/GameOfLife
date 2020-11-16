import { Cell } from '../Cell';

export interface Rule {
  readonly description: string;

  doesMatch(cell: Cell): boolean;

  apply(cell: Cell): void;
}
