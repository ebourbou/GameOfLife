import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Pattern} from '../../_models/pattern';
import {NgForm} from '@angular/forms';
import {ConfirmDeleteDialog} from './confirm-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { PatternService } from '../services/patterns.service';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.scss']
})
export class PatternDetailComponent implements OnInit {
  @Input() pattern: Pattern;

  isAddMode: boolean;
  loading = false;
  submitted = false;

  @ViewChild('form', { read: NgForm }) form: NgForm;

  patternOriginal: Pattern;
  private patternService: PatternService;

  constructor(public dialog: MatDialog,
              patternService: PatternService) {
    this.patternService = patternService;
  }

  ngOnInit(): void {
    if (this.pattern) {
      this.patternService.getPattern(this.pattern.id);
    }
  }

  onSubmit(pattern: Pattern): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createPattern(pattern);
    } else {
      this.updatePattern(pattern);
    }
    this.submitted = true;
    this.loading = false;
  }

  openConfirmDeleteDialog(): void{
      const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
        width: '25em',
        data: {patternName: this.pattern.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          console.log('Delete');
        }
      });
  }

  onRevert(): void{
    this.pattern = JSON.parse(JSON.stringify(this.patternOriginal));
  }

  initPattern(): void{
    this.isAddMode = true;

    this.pattern = {
     id : null,
     name: '',
     description: '',
     author: '',
     year: null,
     heat: null,
     sizeX: 5,
     sizeY: 5,
     pattern: null,
     type: null};
   }

  createPattern(patternToCreate: Pattern): void{
    // Todo Temp pattern
    patternToCreate.pattern = 'oooooo';
    this.patternService.addPattern(patternToCreate);
  }
  updatePattern(patternToUpdate: Pattern): void{
    this.patternService.updatePattern(patternToUpdate);
  }

  deletePattern(patternToDelete: Pattern): void{
    this.patternService.deletePattern(patternToDelete.id);
  }
}
