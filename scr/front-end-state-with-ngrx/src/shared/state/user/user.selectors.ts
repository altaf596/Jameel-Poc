import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";
import { AppStateProperties } from "../app.state";

//Get user state
const currentUserState = createFeatureSelector<UserState>(AppStateProperties.USERS);


//Create selectors

export const getUsersSelector = createSelector(currentUserState, (state) => {
    return state.users;
});




