import { Observable, of } from 'rxjs';
import { RuleSet } from '../../model/rule/rule-set';
import { ReplicatorRuleSet } from './replicator-ruleset';
import { AbstractRuleService } from './abstract-rule.service';
import { LiveFreeOrDieRuleSet } from './live-free-or-die-ruleset';
import { LifeWithoutDeathRuleSet } from './life-without-death-ruleset';
import { MazeRuleSet } from './maze-ruleset';
import { PedestrianLifeRuleSet } from './pedestrian-life-ruleset';
import { AntiLifeRuleSet } from './anti-life-ruleset';
import { Injectable } from '@angular/core';
import { ConwayRuleSet } from './conway-rule-set';

@Injectable({
  providedIn: 'root',
})
export class LocalRuleService extends AbstractRuleService {
  private static ruleSets = [
    new ConwayRuleSet(),
    new ReplicatorRuleSet(),
    new LiveFreeOrDieRuleSet(),
    new LifeWithoutDeathRuleSet(),
    new MazeRuleSet(),
    new PedestrianLifeRuleSet(),
    new AntiLifeRuleSet(),
  ];

  getRuleSets(): Observable<RuleSet[]> {
    return of(LocalRuleService.ruleSets);
  }

  getRuleSet(id: string): Observable<RuleSet> {
    return of(LocalRuleService.ruleSets.find((r) => r.id === id));
  }
}
