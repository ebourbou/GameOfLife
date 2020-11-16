import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls } from '../model/Controls';
import { Pattern } from '../../shared/model/pattern';
import { PatternUtils } from '../../shared/service/pattern-util';
import { newGame } from '../state/game.actions';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StepperStep } from './StepperStep';
import { RuleSet } from '../../shared/model/rule/RuleSet';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input()
  controls: Controls;
  @Input()
  allPatterns: Pattern[];

  @Input()
  allRuleSets: RuleSet[];

  @Output()
  public doResize: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output()
  public doChangeGenerations: EventEmitter<number> = new EventEmitter();
  @Output()
  public doPatternSelected: EventEmitter<Pattern> = new EventEmitter();
  @Output()
  private doRandomCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doResetCells: EventEmitter<void> = new EventEmitter();
  @Output()
  private doInvertCells: EventEmitter<void> = new EventEmitter();
  @Output()
  public doStepChanged: EventEmitter<StepperStep> = new EventEmitter();
  @Output()
  public doRuleSetSelected: EventEmitter<RuleSet> = new EventEmitter();
  @Output()
  private doStartGame: EventEmitter<void> = new EventEmitter();
  @Output()
  public doTogglePause: EventEmitter<void> = new EventEmitter();
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();

  rootGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.rootGroup = this.formBuilder.group({});
    this.doStepChanged.emit(StepperStep.BOARD); // initial
  }

  onPatternSelected(pattern: Pattern): void {
    this.doPatternSelected.emit(pattern);
  }

  onRandom(): void {
    this.doRandomCells.emit();
  }

  onReset(): void {
    this.doResetCells.emit();
  }

  onInvert(): void {
    this.doInvertCells.emit();
  }

  onChangeGenerations(generations: number): void {
    this.doChangeGenerations.emit(generations);
  }

  onResize(size: any): void {
    this.doResize.emit(size);
  }

  selectionChange(event: StepperSelectionEvent): void {
    const nextStep = StepperStep[StepperStep[event.selectedIndex]];
    this.doStepChanged.emit(nextStep);
  }

  onRuleSetSelected(ruleSet: RuleSet): void {
    this.doRuleSetSelected.emit(ruleSet);
  }

  onStartGame(): void {
    this.doStartGame.emit();
  }

  onTogglePause(): void {
    this.doTogglePause.emit();
  }

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }
}
