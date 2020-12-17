import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { APIService } from '../API.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../users/services/users.service';
import { SlideItem } from './slides/slide.item';
import { SlideGame } from './slides/game-slide.component';
import { SlideReferences } from './slides/reference-slide.component';
import { SlideExplanationRules } from './slides/rules-slide.component';
import { SlideTeaser } from './slides/teaser-slide.component';

@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.scss'] })
export class HomeComponent implements AfterViewInit, OnDestroy {
  public homeSlides = new Array<SlideItem>();
  currentSlideIndex = 0;

  @ViewChild('dynamicComponent', { read: ViewContainerRef }) container: ViewContainerRef;
  interval: any;
  pause = false;

  constructor(
    private authService: AuthService,
    private api: APIService,
    private userService: UserService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.homeSlides.push(new SlideItem(SlideTeaser, { page: 1 }));
    this.homeSlides.push(new SlideItem(SlideGame, { page: 2 }));
    this.homeSlides.push(new SlideItem(SlideExplanationRules, { page: 3 }));
    this.homeSlides.push(new SlideItem(SlideReferences, { page: 4 }));
  }

  ngAfterViewInit(): void {
    this.loadComponent();
    this.getSlides();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onPreviousClick(): void {
    this.currentSlideIndex = this.currentSlideIndex > 0 ? this.currentSlideIndex - 1 : this.homeSlides.length - 1;
    this.loadComponent();
  }

  onNextClick(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.homeSlides.length;
    this.loadComponent();
  }

  loadComponent(): void {
    const slideItem = this.homeSlides[this.currentSlideIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(slideItem.component);
    this.container.clear();
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.data = slideItem.data;
  }

  getSlides(): void {
    this.interval = setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.homeSlides.length;
      this.loadComponent();
    }, 10000);
  }

  onTogglePauseClick(): void {
    this.pause = !this.pause;

    if (this.pause) {
      clearInterval(this.interval);
    } else {
      this.getSlides();
    }
  }

  onKey($event: KeyboardEvent): void {
    console.log($event.code);
    switch ($event.code) {
      case '20':
        this.onTogglePauseClick();
        break;
      case '37':
        this.onPreviousClick();
        break;
      case '39':
        this.onNextClick();
        break;
    }
  }
}
