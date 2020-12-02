import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analysis-step',
  templateUrl: './analysis-step.component.html',
  styleUrls: ['./analysis-step.component.scss'],
})
export class AnalysisStepComponent implements OnInit {
  analysisFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.analysisFormGroup = this.formBuilder.group({});
  }
}
