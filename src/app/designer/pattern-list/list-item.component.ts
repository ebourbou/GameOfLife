import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() public title = 'No title';
  @Input() public type = 'n/a';
  @Input() public author = 'n/a';
  @Input() public locked = false;

  constructor() {}

  ngOnInit() {}

  lockedIcon(locked: boolean): string {
    return locked ? 'lock' : 'lock_open';
  }

  typeIcon(type: string): string {
    switch (type) {
      case 'oscillator':
        return 'oscillator';
      case 'buffer':
        return 'buffer';
      case 'static':
        return 'static';
      case 'spaceship':
        return 'spaceship';
      default:
        return 'pattern';
    }
  }
}
