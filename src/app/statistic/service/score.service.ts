import { Injectable } from '@angular/core';
import { Game } from '../../game/model/Game';
import { ScoreLevel } from './score-level.enum';
import { GenerationStatistic } from '../../shared/model/generation-statistic';
import { Observable, of } from 'rxjs';
import { ScoreTag } from './score-tag';
import { ScoreTagEnum } from './score-tag.enum';
import { Score } from './score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private static computeOverallScore(game: Game): number {
    const score = Math.floor((game.board.height * game.board.width * game.generations * game.board.alive()) / 100000000);
    return score > 0 ? score : 0;
  }

  private static computePandemic(statistics: GenerationStatistic[]): ScoreTag {
    return statistics[0].alive > statistics[statistics.length - 1].alive * 5
      ? { tag: ScoreTagEnum.PANDEMIC, level: ScoreLevel.OVERACHIEVER }
      : { tag: ScoreTagEnum.PANDEMIC, level: ScoreLevel.LOUSY };
  }

  private static computeFuriousFinish(statistics: GenerationStatistic[]): ScoreTag {
    if (statistics[Math.floor(statistics.length / 3) * 2].dead < statistics[statistics.length - 1].dead / 2) {
      return { tag: ScoreTagEnum.FURIOUS_FINISH, level: ScoreLevel.OVERACHIEVER };
    } else {
      return { tag: ScoreTagEnum.FURIOUS_FINISH, level: ScoreLevel.LOUSY };
    }
  }

  private static totalDeaths(statistics: GenerationStatistic[]): number {
    return statistics.map((s) => s.died).reduce((a, b) => a + b);
  }

  private static totalBirths(statistics: GenerationStatistic[]): number {
    return statistics.map((s) => s.born).reduce((a, b) => a + b);
  }

  private static totalStateSwitches(statistics: GenerationStatistic[]): number {
    return statistics.map((s) => s.died + s.born).reduce((a, b) => a + b);
  }

  private static totalCells(game: Game): number {
    return game.board.width * game.board.height;
  }

  private static computeDifficulty(game: Game): ScoreTag {
    const score = ScoreService.totalCells(game) * game.ruleSet.difficulty;
    let level = ScoreLevel.LOUSY;
    if (score > 20000) {
      level = ScoreLevel.OVERACHIEVER;
    } else if (score > 5000) {
      level = ScoreLevel.GOOD;
    }
    return { tag: ScoreTagEnum.DIFFICULTY, level };
  }

  private static computeExcitement(game: Game): ScoreTag {
    const score = game.board.dead() - game.board.neverTouched() - ScoreService.totalCells(game) / 2;
    let level = ScoreLevel.LOUSY;
    if (score > 0) {
      level = ScoreLevel.OVERACHIEVER;
    } else if (score > -100) {
      level = ScoreLevel.GOOD;
    }
    return { tag: ScoreTagEnum.EXCITEMENT, level };
  }

  private static computeViolence(game: Game, statistics: GenerationStatistic[]): ScoreTag {
    return ScoreService.totalDeaths(statistics) > ScoreService.totalCells(game) * 3
      ? { tag: ScoreTagEnum.VIOLENCE, level: ScoreLevel.OVERACHIEVER }
      : { tag: ScoreTagEnum.VIOLENCE, level: ScoreLevel.LOUSY };
  }

  private static computeActivity(game: Game, statistics: GenerationStatistic[]): ScoreTag {
    return ScoreService.totalStateSwitches(statistics) / (ScoreService.totalCells(game) * game.generations) > 0
      ? { tag: ScoreTagEnum.ACTIVITY, level: ScoreLevel.OVERACHIEVER }
      : { tag: ScoreTagEnum.ACTIVITY, level: ScoreLevel.LOUSY };
  }

  private static computeBabyBoom(game: Game, statistics: GenerationStatistic[]): ScoreTag {
    return ScoreService.totalBirths(statistics) > ScoreService.totalCells(game) * 10
      ? { tag: ScoreTagEnum.BABY_BOOM, level: ScoreLevel.OVERACHIEVER }
      : { tag: ScoreTagEnum.BABY_BOOM, level: ScoreLevel.LOUSY };
  }
  computeScore(game: Game, statistics: GenerationStatistic[]): Observable<Score> {
    const score = {
      overallScore: ScoreService.computeOverallScore(game),
      tags: [
        ScoreService.computeDifficulty(game),
        ScoreService.computeExcitement(game),
        ScoreService.computeActivity(game, statistics),
        ScoreService.computeBabyBoom(game, statistics),
        ScoreService.computePandemic(statistics),
        ScoreService.computeViolence(game, statistics),
        ScoreService.computeFuriousFinish(statistics),
      ],
    };
    return of(score);
  }
}
