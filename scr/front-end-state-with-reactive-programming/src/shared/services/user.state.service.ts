import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user-dto';
import { UserManagementServiceProxy } from '../service-proxies/user-management.service';

@Injectable()
export class UserStateService {
    private users: User[] = [];

    private storeBehaviorSubject = new BehaviorSubject(new User());
    store = this.storeBehaviorSubject.asObservable();

    constructor(private _userManagementServiceProxy: UserManagementServiceProxy) {
    }


    addUser(user: User) {
        this.users.push(user);
        this.storeBehaviorSubject.next(user);
    }

    getAllUsers() {
        return new Promise<User[]>((resolve, reject) => {
            if (this.users.length > 0) {
                resolve(this.users);
            } else {
                this.loadDataToStoreFromServer().then(response => {
                    this.users = response;
                    resolve(this.users);

                }, error => {
                    reject(error);
                })
            }
        });
    }

    delete(userId: number) {
        return new Promise<boolean>((resolve, reject) => {
            try {
                this.users = this.users.filter(x => x.id != userId);
                resolve(true);
            } catch (err: unknown) {
                reject(err);
            }


        });


    }

    private loadDataToStoreFromServer() {

        return new Promise<User[]>((resolve, reject) => {
            this._userManagementServiceProxy.getAllUsers().subscribe({
                next: (response) => {
                    console.log(response);
                    resolve(JSON.parse(response));
                },
                error: (err) => {
                    reject(err);
                }

            })
        });


    }



}
