import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { Role } from '../../../shared/model/role';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';
import { AuthService } from '../../../core/services/auth.service';
import { ScreenSize } from '../../../shared/service/screen-size.enum';
import { Orientation } from '../../../shared/service/orientation.enum';

@Component({
  selector: 'app-save-step',
  templateUrl: './save-step.component.html',
  styleUrls: ['./save-step.component.scss'],
})
export class SaveStepComponent implements OnInit {
  @Output()
  public doSaveGame: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public doStartFromScratch: EventEmitter<void> = new EventEmitter();

  @Input()
  isBusy: boolean;

  isSaved = false;

  @Input()
  isPublicGame = false;

  @Input()
  screenSize: ScreenSize;

  @Input()
  screenOrientation: Orientation;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSaveGame(): void {
    const user = this.authService.getCurrentUser();
    if (!user || user.role === Role.Anonymous) {
      const dialogRef = this.dialog.open(LoginPromptComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/auth/login']).then(null);
        } else {
          this.onStartFromScratch();
        }
      });
    } else {
      this.doSaveGame.emit(this.isPublicGame);
    }
    this.isSaved = true;
  }

  onStartFromScratch(): void {
    this.doStartFromScratch.emit();
  }
}
