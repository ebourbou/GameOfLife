import { Cell } from "../../shared/model/Cell";

export interface Rule {
  readonly description: string;

  doesMatch(cell: Cell): boolean;

  apply(cell: Cell): void;
}
