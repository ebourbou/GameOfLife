import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  patternName: string;
}
/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'confirm-delete-dialog',
  styleUrls: ['confirm-delete-dialog.scss'],
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
