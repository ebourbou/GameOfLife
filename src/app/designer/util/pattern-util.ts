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

  public static invert(pattern: string): string {
    let invertedStr = '';

    [...pattern].forEach((c) => {
      if (c === '.') {
        invertedStr += 'X';
      } else if (c === 'X') {
        invertedStr += '.';
      } else {
        invertedStr += c;
      }
    });
    return invertedStr;
  }

  public static initPattern(sizeX: number, sizeY: number): string {
    let pattern = '';
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        pattern += '.';
      }
      pattern += '\n';
    }
    return pattern.slice(0, -1);
  }

  public static getPatternSize(pattern: string): { w: number; h: number } {
    if (!pattern) {
      return { w: 0, h: 0 };
    }
    const width = pattern.indexOf('\n');
    const height = pattern.split('\n').length + 1;

    return { w: width, h: height };
  }
}
