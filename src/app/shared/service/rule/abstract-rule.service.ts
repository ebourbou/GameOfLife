import { Observable } from 'rxjs';
import { Ruleset } from '../../model/rule/ruleset';
import { RuleService } from './rule.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractRuleService implements RuleService {
  abstract getRuleSets(): Observable<Ruleset[]>;
  abstract getRuleSet(id: string): Observable<Ruleset>;
}
