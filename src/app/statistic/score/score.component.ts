import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../service/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input()
  score: Score;

  constructor() {}

  ngOnInit(): void {
    console.log('');
  }
}
