import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SlideComponent } from './slide.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  templateUrl: 'video-slide.component.html',
})
export class SlideVideo implements SlideComponent, AfterViewInit {
  @Input() data: any;
  public displayURL: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=CgOcEZinQ2I');
  }
}
