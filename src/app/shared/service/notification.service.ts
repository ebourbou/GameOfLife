import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  info(message: string): void {
    this.snackBar.open(message, 'Schliessen', { duration: 2000 });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Schliessen');
  }

  errors(message: string, details: string[]): void {
    this.snackBar.open([message].concat(details).join('\n'), 'Schliessen');
  }
}
