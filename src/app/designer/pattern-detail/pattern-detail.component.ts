import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Pattern } from '../../shared/model/pattern';
import { NgForm } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PatternsComponent } from '../pattern-list/patterns.component';
import { Board } from '../../shared/model/board';
import { PatternEditorComponent } from '../pattern-editor/pattern-editor.component';
import { PatternService } from '../../shared/service/patterns.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/model/user';
import { Role } from '../../shared/model/role';
import { NotificationService } from '../../shared/service/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.scss'],
})
export class PatternDetailComponent implements OnInit, OnChanges {
  @Input() pattern: Pattern;
  patternOriginal: Pattern;

  user: User;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  public editor: Board;
  id: string;

  @ViewChild('form', { read: NgForm }) form: NgForm;
  @ViewChild('editor') patternEditor: PatternEditorComponent;

  constructor(
    public dialog: MatDialog,
    private patternService: PatternService,
    private patternsComponent: PatternsComponent,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnChanges(): void {
    if (this.pattern) {
      this.patternOriginal = this.pattern;
      this.pattern = JSON.parse(JSON.stringify(this.pattern));
    }
  }

  onSubmit(pattern: Pattern): void {
    this.submitted = true;

    this.pattern.pattern = this.patternEditor.save();
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
    this.isAddMode = false;
    this.submitted = true;
    this.loading = false;
  }

  openConfirmDeleteDialog(patternToDelete: Pattern): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '25em',
      data: { patternName: patternToDelete.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.patternService.deletePattern(patternToDelete.id).subscribe((dlgRes) => {
          this.notificationService.info('Pattern ' + dlgRes.name + ' wurde gelöscht');
        });
      }
    });
  }

  onRevert(): void {
    this.isAddMode = false;
    this.pattern = JSON.parse(JSON.stringify(this.patternOriginal));
    this.patternEditor.load(this.pattern.pattern);
    this.form.reset(this.pattern);
  }

  initPattern(): void {
    this.isAddMode = true;
  }

  createPattern(patternToCreate: Pattern): Observable<Pattern> {
    this.patternService.addPattern(patternToCreate).subscribe(
      (data) => {
        this.notificationService.info('Pattern ' + patternToCreate.name + ' wurde angelegt');
        return data;
      },
      (error) => {
        this.notificationService.error('Fehler: ' + error);
      }
    );
    return null;
  }

  updatePattern(patternToUpdate: Pattern): void {
    this.patternService.updatePattern(patternToUpdate).subscribe((result) => {
      this.notificationService.info('Pattern ' + result.name + ' wurde aktualisiert.');
    });
  }

  deletePattern(patternToDelete: Pattern): void {
    this.openConfirmDeleteDialog(patternToDelete);
  }

  // Reset on size changingØ
  updateSize(): void {
    this.pattern.pattern = null;
  }

  isAdmin(role: Role): boolean {
    return role && role === Role.Admin;
  }

  isDisabled(): boolean {
    if (!this.user) {
      this.user = this.authService.getCurrentUser();
    }
    return this.pattern.locked && !this.isAdmin(this.user.role);
  }
}
