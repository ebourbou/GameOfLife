import { Observable, of } from 'rxjs';
import { RuleSet } from '../../model/rule/RuleSet';
import { ConwaysRuleSet } from './conway/ConwaysRuleSet';
import { AbstractRuleService } from './abstract-rule.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockRuleService extends AbstractRuleService {
  getRuleSets(): Observable<RuleSet[]> {
    const ruleSets = [new ConwaysRuleSet(), new ConwaysRuleSet()];
    return of(ruleSets);
  }
}
