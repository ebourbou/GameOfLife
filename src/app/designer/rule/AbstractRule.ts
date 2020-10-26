import { Cell } from "../../shared/model/Cell";
import { Rule } from "./Rule";

export abstract class AbstractRule implements Rule {
  readonly description: string;

  protected constructor(description: string) {
    this.description = description;
  }

  protected doesMatchOrThrowError(cell: Cell): void {
    if (!this.doesMatch(cell)) {
      throw new Error(
        `This rule should not have been applied. Rule: {description}`
      );
    }
  }

  abstract apply(cell: Cell): void;

  abstract doesMatch(cell: Cell): boolean;
}
