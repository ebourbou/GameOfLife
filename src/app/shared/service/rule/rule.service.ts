import { Observable } from 'rxjs';
import { Ruleset } from '../../model/rule/ruleset';

export interface RuleService {
  getRuleSets(): Observable<Ruleset[]>;
  getRuleSet(id: string): Observable<Ruleset>;
}
