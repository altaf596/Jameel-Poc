import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { User } from 'src/shared/models/user-dto';
import { UserManagementServiceProxy } from 'src/shared/service-proxies/user-management.service';
import { UserStateService } from 'src/shared/services/user.state.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  isViewInitialized = false;
  users: User[] = []; 
  private getUsersSubscription: Subscription;
  private stopSubscriptionEvents$ = new Subject<void>();

  constructor(private _userStateService: UserStateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userManagementServiceProxy: UserManagementServiceProxy,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService) {
    this.getUsersSubscription = Subscription.EMPTY;
  }

  ngOnDestroy(): void {
    this.getUsersSubscription.unsubscribe();
    this.stopSubscriptionEvents$.next();
    this.stopSubscriptionEvents$.complete();
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();
    this.isViewInitialized = true;
  }

  ngOnInit() {

    this._userStateService.getAllUsers().then(response => {
      this.users = response;

      this._userStateService.store.pipe(takeUntil(this.stopSubscriptionEvents$)).subscribe({
        next: (response) => {
  
          if (response?.id) {
            let user = this.users.find(x => x.id === response.id);
            if (!user?.id) {
              this.users.push(response);
            }
          }
  
  
        }
      });
    })


    

  }

  confirm(event: Event, userId: number) {

    this._confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
           // this._messageService.add({ key: 'onApp', severity: 'info', summary: 'Confirmed', detail: 'Deleting user is in progress' });
            // setTimeout(() => {
            //   this.deleteUser(userId);
            // }, 300);

            this.deleteUser(userId);
        },
        reject: () => {
          //this._messageService.add({ key: 'onApp', severity: 'error', summary: 'Error', detail: 'You have rejected'});
        }
    });
}

  deleteUser(userId: number) { 
    this._userManagementServiceProxy.deleteUser(userId).subscribe({
      next: (response) =>{

        this._userStateService.delete(userId).then(res =>{

          this.users = this.users.filter(x => x.id != userId);  

          this._messageService.add({ key: 'onApp', severity: 'success', summary: 'Success', detail: JSON.parse(response) });
        });
        
      },
      error: (err) =>{
        this._messageService.add({ key: 'onApp', severity: 'error', summary: 'Error', detail: 'Kindly try again'});
      }
    });
  }


}

interface userI{

}

