﻿import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Pattern} from '../../_models/pattern';

@Component({ templateUrl: 'layout.component.html', styleUrls: ['layout.component.scss']})
export class LayoutComponent {

  public selectedPattern: Pattern;

  constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}
}
