import { Observable } from 'rxjs';
import { RuleSet } from '../../model/rule/rule-set';

export interface MockRuleService {
  getRuleSets(): Observable<RuleSet[]>;
}
