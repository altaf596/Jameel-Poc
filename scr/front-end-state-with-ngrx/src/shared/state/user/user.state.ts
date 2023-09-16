import { IUser } from "src/shared/models/user-dto";

export interface UserState {
  users: IUser[];
}

export const userInitialState: UserState = {
  users: []
}