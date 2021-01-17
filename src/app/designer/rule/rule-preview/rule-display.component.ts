import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-display',
  templateUrl: './rule-display.component.html',
  styleUrls: ['./rule-display.component.scss'],
})
export class RuleDisplayComponent implements OnInit {
  @Input() rule: string;

  birth: Array<boolean> = [false, false, false, false, false, false, false, false];
  death: Array<boolean> = [false, false, false, false, false, false, false, false];

  ngOnInit(): void {
    // parse BS rule B3/S23

    this.rule
      .split('/')[0]
      .slice(1)
      .split('')
      .map((a) => (this.birth[Number(a) - 1] = true));
    this.rule
      .split('/')[1]
      .slice(1)
      .split('')
      .map((a) => (this.death[Number(a) - 1] = true));
  }
}
