import { createAction, props } from "@ngrx/store";
import { IUser } from "../../models/user-dto";

//action types
export enum UserActions {
  ADD_USER = '[User Page] Add User',
  GET_USERS = '[User Page] Get User',
  LOAD_USERS = '[User Page] Load Users from api',
  LOAD_USERS_SUCCESS = '[User Page] load users success',
  DELETE_USER = "[User Page] Delete User"
}


//create actions
export const loadUsers = createAction(UserActions.LOAD_USERS);

export const loadUsersSuccess = createAction(UserActions.LOAD_USERS_SUCCESS, props<{ users: IUser[] }>());

export const addUser = createAction(UserActions.ADD_USER, props<{ user: IUser }>());

export const getUsers = createAction(UserActions.GET_USERS);

export const deleteUser = createAction(UserActions.DELETE_USER, props<{ id: number }>());

export const dummyAction = createAction('[dummy action]');




