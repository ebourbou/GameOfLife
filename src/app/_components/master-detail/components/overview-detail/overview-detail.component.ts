import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../../services';

@Component({
  selector: 'overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.scss']
})
export class OverviewDetailComponent implements OnInit {

  private isOutletActive = false;

  constructor(public breakpoints: BreakpointService) { }

  ngOnInit() { }

  onOutletActivated($event) {
    // Primarily here for debugging...
    this.isOutletActive = true;
  }

  onOutletDeactivated($event) {
    // Primarily here for debugging...
    this.isOutletActive = false;
  }

}
