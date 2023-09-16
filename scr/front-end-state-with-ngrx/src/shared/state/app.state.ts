import { IUser } from "../models/user-dto";
import { UserReducer } from "./user/user.reducers";

export enum AppStateProperties{
    USERS = 'users'
}

export interface AppState {
    users: IUser[];
}

export const appReducer = {
    users: UserReducer
}
