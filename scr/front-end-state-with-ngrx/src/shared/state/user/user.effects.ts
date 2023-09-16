import { Injectable } from "@angular/core";
import { UserManagementServiceProxy } from "src/shared/service-proxies/user-management.service";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects"
import { deleteUser, dummyAction, loadUsers, loadUsersSuccess } from "./user.actions";
import { map, mergeMap, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { getUsersSelector } from "./user.selectors";
import { Action } from "rxjs/internal/scheduler/Action";


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
            concatLatestFrom(() => this._appStore.select(getUsersSelector)),
            mergeMap(([action, users]) => {

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


    deleteUserEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteUser),
            switchMap((action) => {
                console.log('action', action);
                return this._userManagementServiceProxy.deleteUser(0).pipe(
                    map((data) => {
                        return deleteUser({ id: 0 });
                    })
                )
            })
        )

    })

}