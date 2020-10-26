import { RuleSet } from "../RuleSet";
import { ConwaysFirstRule } from "./ConwaysFirstRule";
import { ConwaysSecondRule } from "./ConwaysSecondRule";
import { ConwaysThirdRule } from "./ConwaysThirdRule";
import { ConwaysFourthRule } from "./ConwaysFourthRule";
import { DoNothingRule } from "../DoNothingRule";

export class ConwaysRuleSet extends RuleSet {
  constructor() {
    super();
    this.shortName = "2/3";
    this.description = "Die von Conway ursprünglich verwendeten Regeln.";
    this.rules.push(
      new ConwaysFirstRule(),
      new ConwaysSecondRule(),
      new ConwaysThirdRule(),
      new ConwaysFourthRule(),
      new DoNothingRule()
    );
  }
}
