import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({ selector: 'user-component', templateUrl: 'user.component.html' })
export class UserComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }
}
