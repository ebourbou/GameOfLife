import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../users/services/users.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { UserUtils } from '../../../users/utils/user-utils';
import { Role } from '../../../shared/model/role';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../auth/login/login.component';
import { Router } from '@angular/router';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

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

  constructor(private router: Router, private notificationService: NotificationService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onSaveGame(): void {
    const user = UserUtils.loadUserFromLocal();
    if (!user || user.role === Role.Anonymous) {
      const dialogRef = this.dialog.open(LoginPromptComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/auth/login']);
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
