import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import {Pattern} from '../../shared/model/pattern';
import {NgForm} from '@angular/forms';
import {ConfirmDeleteDialog} from './confirm-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { PatternService } from '../services/patterns.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatternsComponent } from '../pattern-list/patterns.component';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.scss']
})
export class PatternDetailComponent implements OnChanges {
  @Input() pattern: Pattern;

  selectedPattern: Pattern;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  @ViewChild('form', { read: NgForm }) form: NgForm;

  patternOriginal: Pattern;
  private patternService: PatternService;
  private patternsComponent: PatternsComponent;

  constructor(public dialog: MatDialog,
              patternService: PatternService,
              patternsComponent: PatternsComponent,
              private snackBarService: MatSnackBar) {
    this.patternService = patternService;
    this.snackBarService = snackBarService;
    this.patternsComponent = patternsComponent;
  }

  ngOnChanges(): void {
    if (this.pattern) {
      this.patternOriginal = this.pattern;
      this.pattern = JSON.parse(JSON.stringify(this.pattern));
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

  openConfirmDeleteDialog(patternToDelete: Pattern): void{
      const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
        width: '25em',
        data: {patternName: this.pattern.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.patternService.deletePattern(patternToDelete.id);
          this.snackBarService.open('Pattern ' + patternToDelete.name + ' wurde gelöscht', 'Schliessen', {
            duration: 2000
          });
          this.patternsComponent.reload();
        }
      });
  }

  onRevert(): void{
    this.form.resetForm();
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
    this.snackBarService.open('Pattern ' + patternToCreate.name + ' wurde angelegt', 'Schliessen', {
      duration: 2000
    });
    this.patternsComponent.reload();
  }
  updatePattern(patternToUpdate: Pattern): void{
    this.patternService.updatePattern(patternToUpdate);
    this.snackBarService.open('Pattern ' + patternToUpdate.name + ' wurde aktualisiert.', 'Schliessen', {
      duration: 2000
    });
    this.patternsComponent.reload();
  }

  deletePattern(patternToDelete: Pattern): void{
    this.openConfirmDeleteDialog(patternToDelete);
    this.patternsComponent.selectPattern(null);
  }
}
