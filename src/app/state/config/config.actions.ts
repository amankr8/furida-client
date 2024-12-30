import { createAction, props } from '@ngrx/store';

export const toggleBoolSetting1 = createAction(
  '[Config] Toggle Boolean Setting 1',
  props<{ boolSetting1: boolean }>()
);

export const toggleBoolSetting2 = createAction(
  '[Config] Toggle Boolean Setting 2',
  props<{ boolSetting2: boolean }>()
);
