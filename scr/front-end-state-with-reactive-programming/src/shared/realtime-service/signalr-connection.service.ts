import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr" 
import { AppConstant } from '../AppContanct';


@Injectable()
export class SignalRConnectionService {
    app: any = {};
    remoteServiceBaseUrl: string;
    private hubConnection!: signalR.HubConnection
    constructor() {
        this.remoteServiceBaseUrl = AppConstant.apiBaseUrl;
    }


    getConnection(hubNamne: string = '') {
        return new Promise<signalR.HubConnection>((resolve, reject) => {

            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(AppConstant.apiBaseUrl + "/" + hubNamne)
                .withAutomaticReconnect([0, 1000, 2000, 4000, 8000, 16000])
                .configureLogging(signalR.LogLevel.Information)
                .build();


            this.hubConnection
                .start()
                .then(() => {
                    resolve(this.hubConnection)
                })
                .catch(err => {
                    reject(err);
                })


        });
    }




}

