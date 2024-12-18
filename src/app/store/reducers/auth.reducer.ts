import { createReducer, on } from '@ngrx/store';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFail,
  signInUser,
  signInUserFail,
  signInUserSuccess,
  logoutUser,
  loadAuthUser,
  loadAuthUserFail,
  loadAuthUserSuccess,
} from '../actions/auth.actions';
import { initialAuthState } from '../auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(loadAuthUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadAuthUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    loading: false,
  })),

  on(loadAuthUserFail, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  })),

  on(signUpUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(signUpUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(signUpUserFail, (state, { error }) => ({
    ...state,
    error: error.message,
    loading: false,
  })),

  on(signInUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(signInUserSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(signInUserFail, (state, { error }) => ({
    ...state,
    error: error.message,
    loading: false,
  })),

  on(logoutUser, (state) => ({
    ...state,
    user: null,
  }))
);
