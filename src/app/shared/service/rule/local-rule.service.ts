import { Observable, of } from 'rxjs';
import { Ruleset } from '../../model/rule/ruleset';
import { ConwaysRuleSet } from './conway/conways-rule-set';
import { ReplicatorRuleset } from './replicator-ruleset';
import { AbstractRuleService } from './abstract-rule.service';
import { LiveFreeOrDieRuleset } from './live-free-or-die-ruleset';
import { LifeWithoutDeathRuleset } from './life-without-death-ruleset';
import { MazeRuleset } from './maze-ruleset';
import { PedestrianLifeRuleset } from './pedestrian-life-ruleset';
import { AntiLifeRuleset } from './anti-life-ruleset';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalRuleService extends AbstractRuleService {
  private static ruleSets = [
    new ConwaysRuleSet(),
    new ReplicatorRuleset(),
    new LiveFreeOrDieRuleset(),
    new LifeWithoutDeathRuleset(),
    new MazeRuleset(),
    new PedestrianLifeRuleset(),
    new AntiLifeRuleset(),
  ];

  getRuleSets(): Observable<Ruleset[]> {
    return of(LocalRuleService.ruleSets);
  }

  getRuleSet(id: string): Observable<Ruleset> {
    return of(LocalRuleService.ruleSets.find((r) => r.id === id));
  }
}
