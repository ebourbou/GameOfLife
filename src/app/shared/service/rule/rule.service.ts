import { Observable } from 'rxjs';
import { RuleSet } from '../../model/rule/RuleSet';

export interface RuleService {
  getRuleSets(): Observable<RuleSet[]>;
}
