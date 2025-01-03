import { createReducer, on } from '@ngrx/store';
import { toggleBoolSetting1, toggleBoolSetting2 } from './config.actions';

export interface ConfigState {
  boolSetting1: boolean;
  boolSetting2: boolean;
}

export const initialConfigState: ConfigState = {
  boolSetting1: true,
  boolSetting2: false,
};

export const configReducer = createReducer(
  initialConfigState,
  on(toggleBoolSetting1, (state, { boolSetting1 }) => ({
    ...state,
    boolSetting1,
  })),

  on(toggleBoolSetting2, (state, { boolSetting2 }) => ({
    ...state,
    boolSetting2,
  }))
);
