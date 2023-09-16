import { Injectable, Injector } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { SignalRConnectionService } from './signalr-connection.service';
import { UserStateService } from '../services/user.state.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserActions, addUser } from '../state/user/user.actions';
import { IUser, User } from '../models/user-dto';

@Injectable()
export class RealtimeNotificationService {
    private connection!: signalR.HubConnection;
    private hubName: string = 'NotificationHub';

    constructor(
        private injector: Injector,
        private _signalRConnectionService: SignalRConnectionService,
        private _userStateService: UserStateService,
        private _appStore: Store<AppState>) {

    }

    public initNotificationObserver() {
        this._signalRConnectionService.getConnection(this.hubName).then(con => {
            this.connection = con;
            this.initAllNotificationEventListener();
        });
    }



    private initAllNotificationEventListener() {
        this.connection.on("onUserAdded", (response) => {
            if (response?.firstName) { 

                const user: IUser = {
                    id: response.id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    dob: response.dob,
                    phoneNumber: response.phoneNumber,
                    address: response.address
                }
                this._appStore.dispatch(addUser({ user }));

            }
            console.log(response);
        });
    }
}