import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { IUser } from 'src/shared/models/user-dto';
import { UserManagementServiceProxy } from 'src/shared/service-proxies/user-management.service';
import { UserStateService } from 'src/shared/services/user.state.service';
import { AppState } from 'src/shared/state/app.state';
import { getAllUsers as getAllUsersSelector } from 'src/shared/state/user/user.selector';
import { deleteUser } from 'src/shared/state/user/user.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: Observable<IUser[]>;

  constructor(private _appStore: Store<AppState>,
    private _userStateService: UserStateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userManagementServiceProxy: UserManagementServiceProxy,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.users = this._appStore.select(getAllUsersSelector);   
  }


  confirm(event: Event, userId: number) {

    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: number) {
    this._userManagementServiceProxy.deleteUser(userId).subscribe({
      next: (response) => {

        this._appStore.dispatch(deleteUser({ id: userId }));

        this._messageService.add({ key: 'onApp', severity: 'success', summary: 'Success', detail: JSON.parse(response) });

      },
      error: (err) => {
        this._messageService.add({ key: 'onApp', severity: 'error', summary: 'Error', detail: 'Kindly try again' });
      }
    });
  }

}
