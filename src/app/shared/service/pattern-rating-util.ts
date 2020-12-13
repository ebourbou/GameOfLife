import { Rating } from '../model/pattern-rating';

export class RatingUtils {
  public static fromAwsPattern(awsRating): Rating {
    let pat: Rating;
    pat = {
      id: awsRating.id,
      userId: awsRating.userId,
      rateId: awsRating.rateId,
      rating: awsRating.rating,
      comment: awsRating.comment,
    };
    return pat;
  }

  public static toAwsPattern(rating): Rating {
    let patRate: any;
    patRate = {
      id: rating.id,
      userId: rating.userId,
      rateId: rating.rateId,
      comment: rating.comment,
      rating: rating.rating,
    };
    return patRate;
  }
}
