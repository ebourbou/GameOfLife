import { Observable } from 'rxjs';
import { RuleSet } from '../../model/rule/rule-set';

export interface RuleService {
  getRuleSets(): Observable<RuleSet[]>;
  getRuleSet(id: string): Observable<RuleSet>;
}
