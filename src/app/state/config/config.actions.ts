import { createAction, props } from '@ngrx/store';

export const toggleHeaderVersion = createAction(
  '[Config] Toggle Header',
  props<{ newHeader: boolean }>()
);

export const toggleAdminHeaderVersion = createAction(
  '[Config] Toggle Admin Header',
  props<{ newAdminHeader: boolean }>()
);
