import { createReducer, on } from '@ngrx/store';
import { Config } from '../../interface/config';
import {
  toggleAdminHeaderVersion,
  toggleHeaderVersion,
} from './config.actions';

export interface ConfigState {
  config: Config;
}

export const initialConfigState: ConfigState = {
  config: {
    headerConfig: {
      newAdminHeader: false,
      newHeader: false,
    },
  },
};

export const configReducer = createReducer(
  initialConfigState,
  on(toggleHeaderVersion, (state, { newHeader }) => ({
    ...state,
    config: {
      ...state.config,
      headerConfig: {
        ...state.config.headerConfig,
        newHeader,
      },
    },
  })),

  on(toggleAdminHeaderVersion, (state, { newAdminHeader }) => ({
    ...state,
    config: {
      headerConfig: {
        ...state.config.headerConfig,
        newAdminHeader,
      },
    },
  }))
);
