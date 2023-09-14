import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RealtimeNotificationService } from 'src/shared/realtime-service/realtime-notification.service';
import { UserManagementServiceProxy } from 'src/shared/service-proxies/user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private _realtimeNotificationService: RealtimeNotificationService,
    private _userManagementServiceProxy: UserManagementServiceProxy) {
    _realtimeNotificationService.initNotificationObserver();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
