import { ScoreLevel } from './score-level.enum';
import { ScoreTagEnum } from './score-tag.enum';

export interface ScoreTag {
  tag: ScoreTagEnum;
  level: ScoreLevel;
}
