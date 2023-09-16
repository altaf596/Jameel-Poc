import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./user.state"
import { addUser, deleteUser } from "./user.action";

//create user reducers
const _userReducer = createReducer(userInitialState,
    on(addUser, (state, action) => {
        return {
            ...state, users: [...state.users, action.user],
        };
    }),
    on(deleteUser, (state, action) => {
        const updatedUsers = state.users.filter(x => x.id != action.id);
        return {
            ...state, users: updatedUsers
        }
    })
);

export function UserReducer(state: any, action: any) {
    return _userReducer(state, action)
}