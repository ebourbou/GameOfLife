import { Observable } from 'rxjs';
import { RuleSet } from '../../model/rule/RuleSet';
import { RuleService } from './rule.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractRuleService implements RuleService {
  abstract getRuleSets(): Observable<RuleSet[]>;
}
