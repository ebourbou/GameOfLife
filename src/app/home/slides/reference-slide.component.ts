import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  styleUrls: ['reference-slide.component.scss'],
  templateUrl: 'reference-slide.component.html',
})
export class SlideReferences implements SlideComponent {
  @Input() data: any;

  constructor() {}
}
