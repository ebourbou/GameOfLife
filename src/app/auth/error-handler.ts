import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from '../shared/service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  private notificationService: NotificationService;
  constructor(private injector: Injector) {
    this.notificationService = this.injector.get(NotificationService);
  }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // Backend Fehler
      this.notificationService.error('Server Fehler');
      console.error('Backend returned status code: ', error.status);
      console.error('Response body:', error.message);
    } else {
      // Client seitig
      this.notificationService.error('Fehler: ' + error.message);
    }
  }
}
