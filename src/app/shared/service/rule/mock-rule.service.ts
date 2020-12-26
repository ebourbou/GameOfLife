import { Observable } from 'rxjs';
import { Ruleset } from '../../model/rule/ruleset';

export interface MockRuleService {
  getRuleSets(): Observable<Ruleset[]>;
}
