import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controls } from '../model/controls';
import { Pattern } from '../../shared/model/pattern';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StepperStep } from './stepper-step';
import { RuleSet } from '../../shared/model/rule/rule-set';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ScreenSize } from '../../shared/service/screen-size.enum';
import { Orientation } from '../../shared/service/orientation.enum';

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
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

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
  private doSaveGame: EventEmitter<boolean> = new EventEmitter();
  @Output()
  private doStartFromScratch: EventEmitter<void> = new EventEmitter();

  rootGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

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

  onSaveGame(isPublic: boolean): void {
    this.doSaveGame.emit(isPublic);
  }

  onNextStepProgrammatically(): void {
    this.stepper.next();
  }

  resetStepper(): void {
    this.stepper.reset();
  }

  onStartFromScratch(): void {
    this.doStartFromScratch.emit();
  }

  screenAdaptationClasses(): string[] {
    const classes = [];
    if (
      this.screenSize === ScreenSize.HANDSET ||
      (this.screenSize === ScreenSize.TABLET && this.screenOrientation === Orientation.PORTRAIT)
    ) {
      classes.push('handset');
    }
    return classes;
  }
}
