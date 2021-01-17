import { Component, Input } from '@angular/core';
import { SlideComponent } from './slide.component';

@Component({
  styleUrls: ['teaser-slide.component.scss'],
  templateUrl: 'teaser-slide.component.html',
})
export class SlideTeaserComponent implements SlideComponent {
  @Input() data = '';
}
