import { Observable } from 'rxjs';
import { RuleSet } from '../../model/rule/RuleSet';

export interface MockRuleService {
  getRuleSets(): Observable<RuleSet[]>;
}
