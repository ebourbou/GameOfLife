import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { NgForm } from '@angular/forms';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PatternService } from '../services/patterns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatternsComponent } from '../pattern-list/patterns.component';
import { Board } from '../../game/model/Board';
import { PatternEditorComponent } from '../pattern-editor/pattern-editor.component';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.scss'],
})
export class PatternDetailComponent implements OnChanges {
  @Input() pattern: Pattern;

  isAddMode: boolean;
  loading = false;
  submitted = false;
  public editor: Board;

  @ViewChild('form', { read: NgForm }) form: NgForm;
  @ViewChild('editor') patternEditor: PatternEditorComponent;

  patternOriginal: Pattern;
  private patternService: PatternService;
  private patternsComponent: PatternsComponent;

  constructor(
    public dialog: MatDialog,
    patternService: PatternService,
    patternsComponent: PatternsComponent,
    private snackBarService: MatSnackBar
  ) {
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
    this.form.resetForm(pattern);
    this.submitted = true;
    this.loading = false;
  }

  openConfirmDeleteDialog(patternToDelete: Pattern): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '25em',
      data: { patternName: this.pattern.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.patternService.deletePattern(patternToDelete.id).then((result) => {
          this.snackBarService.open('Pattern ' + result.name + ' wurde gelöscht', 'Schliessen', {
            duration: 2000,
          });
        });
      }
    });
  }

  onRevert(): void {
    this.pattern = JSON.parse(JSON.stringify(this.patternOriginal));
    this.patternEditor.load();
    this.form.reset(this.pattern);
  }

  initPattern(): void {
    this.isAddMode = true;

    this.pattern = {
      id: null,
      name: '',
      description: '',
      author: '',
      year: null,
      heat: null,
      sizeX: 5,
      sizeY: 5,
      pattern: null,
      type: null,
    };
  }

  createPattern(patternToCreate: Pattern): Pattern {
    // Todo Temp pattern
    this.patternService
      .addPattern(patternToCreate)
      .then((data) => {
        this.snackBarService.open('Pattern ' + patternToCreate.name + ' wurde angelegt', 'Schliessen', {
          duration: 2000,
        });
        return data;
      })
      .catch(); // Error
    return null;
  }

  updatePattern(patternToUpdate: Pattern): void {
    patternToUpdate.pattern = this.patternEditor.save();
    this.patternService.updatePattern(patternToUpdate).then((result) => {
      this.snackBarService.open('Pattern ' + result.name + ' wurde aktualisiert.', 'Schliessen', {
        duration: 2000,
      });
    });
  }

  deletePattern(patternToDelete: Pattern): void {
    this.openConfirmDeleteDialog(patternToDelete);
  }

  // Reset on size changingØ
  private updateSize(): void {
    this.pattern.pattern = null;
  }
}
