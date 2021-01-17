import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-medal',
  templateUrl: './score-medal.component.html',
  styleUrls: ['./score-medal.component.scss'],
})
export class ScoreMedalComponent implements OnInit {
  @Input()
  overallScore: number;

  @Input()
  size: Size = Size.LARGE;

  constructor() {}

  ngOnInit(): void {}
}

// noinspection JSUnusedGlobalSymbols
enum Size {
  LARGE,
  SMALL,
}
