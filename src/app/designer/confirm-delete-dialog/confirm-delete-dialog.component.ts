import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  patternName: string;
}
/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-confirm-delete-dialog',
  styleUrls: ['confirm-delete-dialog.scss'],
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
