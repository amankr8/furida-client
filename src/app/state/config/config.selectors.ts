import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from './config.reducer';

export const selectConfigState = createFeatureSelector<ConfigState>('config');

export const selectConfig = createSelector(selectConfigState, (state) => state);
