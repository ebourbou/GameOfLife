import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { APIService } from '../API.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../users/services/users.service';
import { SlideExplanation } from './slides/explanation-slide.component';
import { SlideItem } from './slides/slide.item';
import { SlideStart } from './slides/start-slide.component';
import { SlideExplanation2 } from './slides/explanation2-slide.component';
import { SlideReferences } from './slides/reference-slide.component';

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
    this.homeSlides.push(new SlideItem(SlideStart, {}));
    this.homeSlides.push(new SlideItem(SlideExplanation, {}));
    this.homeSlides.push(new SlideItem(SlideExplanation2, {}));
    this.homeSlides.push(new SlideItem(SlideReferences, {}));
  }

  ngAfterViewInit(): void {
    this.loadComponent();
    this.getSlides();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onPreviousClick(): void {
    this.currentSlideIndex = this.currentSlideIndex >= 0 ? this.currentSlideIndex - 1 : this.homeSlides.length - 1;
    this.loadComponent();
  }

  onNextClick(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.homeSlides.length;
    this.loadComponent();
  }

  loadComponent(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.homeSlides.length;
    const slideItem = this.homeSlides[this.currentSlideIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(slideItem.component);
    this.container.clear();
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.data = slideItem.data;
  }

  getSlides(): void {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 8000);
  }

  onTooglePauseClick(): void {
    this.pause = !this.pause;

    if (this.pause) {
      clearInterval(this.interval);
    } else {
      this.getSlides();
    }
  }
}
