import { Pattern } from '../model/pattern';

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

  public static toGroupedPatternMap(patterns: Pattern[]): Array<{ key: string; value: Pattern[] }> {
    const grouped = new Array<{ key; value }>();
    patterns.forEach((p) => {
      if (!grouped.find((g) => g.key === p.type)) {
        const newGroup = new Array<Pattern>();
        newGroup.push(p);
        grouped.push({ key: p.type, value: newGroup });
      } else {
        grouped.find((g) => g.key === p.type).value.push(p);
      }
    });
    return grouped;
  }
}
