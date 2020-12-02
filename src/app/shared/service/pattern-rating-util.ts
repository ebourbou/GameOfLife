import { Pattern } from '../model/pattern';
import { PatternRating } from '../model/pattern-rating';

export class PatternRatingUtils {
  public static fromAwsPattern(awsRating): PatternRating {
    let pat: PatternRating;
    pat = {
      id: awsRating.id,
      userId: awsRating.userId,
      patternId: awsRating.patternId,
      rating: awsRating.rating,
      comment: awsRating.comment,
    };
    return pat;
  }

  public static toAwsPattern(patternRating): PatternRating {
    let patRate: any;
    patRate = {
      id: patternRating.id,
      userId: patternRating.userId,
      patternId: patternRating.patternId,
      comment: patternRating.comment,
      rating: patternRating.rating,
    };
    return patRate;
  }
}
