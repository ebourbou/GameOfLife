import { ScoreTag } from './score-tag';

export interface Score {
  overallScore: number;
  tags: ScoreTag[];
}
