import { createAction, props } from '@ngrx/store';
import { User } from '../../interface/user';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
  '[Users] Load Users Fail',
  props<{ error: string }>()
);

export const openEditDialog = createAction('[User] Open Edit Dialog');

export const updateUser = createAction(
  '[Users] Update User',
  props<{ oldPassword: string; newPassword: string }>()
);

export const updateUserSuccess = createAction('[Users] Update User Success');

export const updateUserFail = createAction(
  '[Users] Update User Fail',
  props<{ error: string }>()
);

export const openDeleteDialog = createAction(
  '[User] Open Delete Dialog',
  props<{ userId: number }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFail = createAction(
  '[User] Delete User Fail',
  props<{ error: string }>()
);
