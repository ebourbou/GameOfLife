import { Component, OnInit, Input } from '@angular/core';
import {BreakpointService} from '../../../_components/master-detail/services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public defaultTitle = 'No title';

  @Input() title = this.defaultTitle;
  @Input() showBack = false;
  @Input() backRoute = '../../';

  constructor(public breakpointService: BreakpointService) { }

  ngOnInit() { }

}
