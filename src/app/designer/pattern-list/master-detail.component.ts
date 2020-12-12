import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../services/breakpoint.service';

@Component({
  selector: 'lib-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss'],
})
export class MasterDetailComponent implements OnInit {
  private isOutletActive = false;

  constructor(public breakpoints: BreakpointService) {}

  ngOnInit() {}

  onOutletActivated($event): void {
    // Primarily here for debugging...
    this.isOutletActive = true;
  }

  onOutletDeactivated($event): void {
    // Primarily here for debugging...
    this.isOutletActive = false;
  }
}
