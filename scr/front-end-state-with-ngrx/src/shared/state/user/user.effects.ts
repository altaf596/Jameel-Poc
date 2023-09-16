import { Injectable } from "@angular/core";
import { UserManagementServiceProxy } from "src/shared/service-proxies/user-management.service";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects"
import { dummyAction, loadUsers, loadUsersSuccess } from "./user.actions";
import { map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { getUsersSelector } from "./user.selectors";


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private _userManagementServiceProxy: UserManagementServiceProxy,
        private _appStore: Store<AppState>) {

    }


    getUsersEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUsers),
            //concatLatestFrom
            concatLatestFrom(() => this._appStore.select(getUsersSelector)),
            mergeMap(([action, users]) => {

                console.log("users:", users);

                if (!users.length || users.length === 1) {

                    return this._userManagementServiceProxy.getAllUsers().pipe(
                        map((users) => {

                            if (!users?.length) {
                                users = [];
                            } else {
                                users = JSON.parse(users);
                            }

                            return loadUsersSuccess({ users });

                        })
                    );

                }
                return of(dummyAction());
            })
        );

    });
}