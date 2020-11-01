import { Pattern } from '../../shared/model/pattern';

export class PatternUtils {

  public static convertPattern(awsPattern): Pattern {
    let pat: Pattern;
    pat = {
      id: awsPattern.id,
      name: awsPattern.name,
      description: awsPattern.description,
      author: awsPattern.author,
      year: awsPattern.year,
      heat: awsPattern.heat,
      sizeX: awsPattern.boxX,
      sizeY: awsPattern.boxY,
      pattern: awsPattern.pattern,
      type: awsPattern.type
    };
    return pat;
  }
}
