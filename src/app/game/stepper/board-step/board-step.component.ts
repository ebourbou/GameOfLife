import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Controls } from '../../model/Controls';
import { Game } from '../../model/Game';
import { DefaultsService } from '../../../shared/service/defaults.service';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-board-step',
  templateUrl: './board-step.component.html',
  styleUrls: ['./board-step.component.scss'],
})
export class BoardStepComponent implements OnInit, AfterViewInit {
  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();

  @Input()
  controls: Controls;

  @ViewChild('generations') generationsComponent: MatSlider;

  private sizes: Map<string, { x: number; y: number }>;

  constructor(private defaults: DefaultsService) {}

  ngOnInit(): void {
    this.loadSizes();
  }

  ngAfterViewInit(): void {
    this.generationsComponent.value = this.controls.generations;
  }

  onChangeGenerations(generations: number): void {
    this.doChangeGenerations.emit(generations);
  }

  onChangeSize($event: any): void {
    this.doResize.emit(this.sizes.get($event));
  }

  private loadSizes(): void {
    this.defaults.defaultSizes().subscribe((sizes) => {
      this.sizes = sizes;
    });
    // TODO Wie war das mit unsubscribe und memory leaks? besser async pipe im html und binding property?
  }
}
