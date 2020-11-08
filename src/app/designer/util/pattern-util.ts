import { Pattern } from '../../shared/model/pattern';

export class PatternUtils {
  public static fromAwsPattern(awsPattern): Pattern {
    let pat: Pattern;
    pat = {
      id: awsPattern.id,
      name: awsPattern.name,
      description: awsPattern.description,
      author: awsPattern.author,
      year: awsPattern.year,
      heat: awsPattern.heat,
      sizeX: awsPattern.sizeX,
      sizeY: awsPattern.sizeY,
      pattern: awsPattern.pattern,
      type: awsPattern.type,
    };
    return pat;
  }

  public static toAwsPattern(pattern): Pattern {
    let pat: any;
    pat = {
      id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      author: pattern.author,
      year: pattern.year,
      heat: pattern.heat,
      sizeX: pattern.sizeX,
      sizeY: pattern.sizeY,
      pattern: pattern.pattern,
      type: pattern.type,
    };
    return pat;
  }
}
