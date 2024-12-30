import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

export const selectProjectsState =
  createFeatureSelector<ProjectState>('projects');

export const selectProjectById = (id: number) =>
  createSelector(selectProjectsState, (state) =>
    state.projects.find((p) => p.id === id)
  );

export const selectProjects = createSelector(
  selectProjectsState,
  (state) => state.projects
);

export const selectProjectLoaded = createSelector(
  selectProjectsState,
  (state) => state.isLoaded
);

export const selectProjectLoading = createSelector(
  selectProjectsState,
  (state) => state.loading
);

export const selectProjectError = createSelector(
  selectProjectsState,
  (state) => state.error
);
