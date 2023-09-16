import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersComponent } from './users/users.component'; 
import { RealtimeNotificationService } from 'src/shared/realtime-service/realtime-notification.service';
import { SignalRConnectionService } from 'src/shared/realtime-service/signalr-connection.service';
import { API_BASE_URL } from 'src/shared/service-proxies/base.service';
import { AppConstant } from 'src/shared/AppContanct';
import { UserManagementServiceProxy } from 'src/shared/service-proxies/user-management.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NumberDirective } from 'src/shared/directives/numbers-only.directive';
import { UserStateService } from 'src/shared/services/user.state.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { StoreModule } from '@ngrx/store'; 
import { appReducer } from 'src/shared/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/shared/state/user/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UsersComponent, 
    NumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    BrowserAnimationsModule,
    TableModule,
    RippleModule,
    ButtonModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
    ConfirmPopupModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UserEffects]), 

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),

  ],
  providers: [
    SignalRConnectionService,
    RealtimeNotificationService,
    UserManagementServiceProxy,
    UserStateService,
    MessageService,
    ConfirmationService,
    { provide: API_BASE_URL, useFactory: () => AppConstant.apiBaseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
