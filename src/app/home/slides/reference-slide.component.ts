import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pattern } from '../../shared/model/pattern';
import { ConwaysRuleSet } from '../../shared/service/rule/conway/ConwaysRuleSet';
import { RuleSet } from '../../shared/model/rule/RuleSet';

@Component({
  styleUrls: ['reference-slide.component.scss'],
  templateUrl: 'reference-slide.component.html',
})
export class SlideReferences implements SlideComponent {
  @Input() data: any;
  blinker: Pattern = {
    id: '1',
    name: 'Blinker',
    description: 'string',
    author: '',
    year: 1970,
    sizeX: 3,
    sizeY: 3,
    pattern: '...\nooo\n...',
    type: 'oscillator',
    locked: true,
  };
  oscillator: Pattern = {
    id: '2',
    name: 'Oscillator',
    description: 'string',
    author: '',
    year: 1970,
    sizeX: 8,
    sizeY: 8,
    pattern: '...OO...\n..O..O..\n.O....O.\nO......O\nO......O\n.O....O.\n..O..O..\n...OO...',
    type: 'oscillator',
    locked: true,
  };
  conwayRules: RuleSet;

  constructor() {
    this.conwayRules = new ConwaysRuleSet();
  }
}
