import { Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';

@Component({
  templateUrl: 'explanation-slide.component.html',
})
export class SlideExplanation implements SlideComponent {
  @Input() data: any;
}
