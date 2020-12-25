import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../users/services/users.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { UserUtils } from '../../../users/utils/user-utils';
import { Role } from '../../../shared/model/role';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../auth/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-step',
  templateUrl: './save-step.component.html',
  styleUrls: ['./save-step.component.scss'],
})
export class SaveStepComponent implements OnInit {
  @Output()
  public doSaveGame: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public doReset: EventEmitter<void> = new EventEmitter();

  @Input()
  isBusy: boolean;

  @Input()
  isPublicGame = false;

  constructor(private router: Router, private notificationService: NotificationService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onSaveGame(): void {
    let user = UserUtils.loadUserFromLocal();
    if (!user || user.role === Role.Anonymous) {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => {
        // damit das funktioniert müsste
        user = UserUtils.loadUserFromLocal();
        this.notificationService.info(' Willkommen ' + user.username + '! Du bist jetzt angemeldet.');
      });
    }

    this.doSaveGame.emit(this.isPublicGame);
    // TODO this.doReset.emit();
  }

  onReset(): void {
    this.doReset.emit();
  }
}
