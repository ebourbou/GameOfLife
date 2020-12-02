import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls } from '../model/Controls';
import { Pattern } from '../../shared/model/pattern';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StepperStep } from './StepperStep';
import { RuleSet } from '../../shared/model/rule/RuleSet';
import { Game } from '../model/Game';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;

  @Input()
  controls: Controls;
  @Input()
  allPatterns: Pattern[];

  @Input()
  isBusy: boolean;

  @Input()
  isRunning: boolean;

  @Input()
  isGameFinished: boolean;

  @Input()
  allRuleSets: RuleSet[];

  @Input()
  allGames: Game[];

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
  private doSaveGame: EventEmitter<void> = new EventEmitter();
  @Output()
  public doTogglePause: EventEmitter<void> = new EventEmitter();
  @Output()
  public doChangeSpeed: EventEmitter<number> = new EventEmitter();
  @Output()
  private doApplyGame: EventEmitter<string> = new EventEmitter();
  @Output()
  private doLoadGames: EventEmitter<void> = new EventEmitter();

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

  onApplyGame(id: string): void {
    this.doApplyGame.emit(id);
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

  onSaveGame(): void {
    this.doSaveGame.emit();
  }

  onTogglePause(): void {
    this.doTogglePause.emit();
  }

  onChangeSpeed(speed: number): void {
    this.doChangeSpeed.emit(speed);
  }

  onLoadGames(): void {
    this.doLoadGames.emit();
  }

  onNextStepProgrammatically(): void {
    this.stepper.next();
  }
}
