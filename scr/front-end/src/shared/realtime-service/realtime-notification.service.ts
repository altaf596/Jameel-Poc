import { Injectable, Injector } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { SignalRConnectionService } from './signalr-connection.service';
import { UserStateService } from '../services/user.state.service';

@Injectable()
export class RealtimeNotificationService {
    private connection!: signalR.HubConnection;
    private hubName: string = 'NotificationHub';

    constructor(
        private injector: Injector,
        private _signalRConnectionService: SignalRConnectionService,
        private _userStateService: UserStateService) {

    }

    public initNotificationObserver() {
        this._signalRConnectionService.getConnection(this.hubName).then(con => {
            this.connection = con;
            this.initAllNotificationEventListener();
        });
    }



    private initAllNotificationEventListener() {
        this.connection.on("onUserAdded", (response) => {
            if(response?.firstName){
                this._userStateService.addUser(response);
            }
            console.log(response);
        });
    }
}