import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';

@Component({
  templateUrl: 'explanation2-slide.component.html',
})
export class SlideExplanation2 implements SlideComponent {
  @Input() data: any;
}
