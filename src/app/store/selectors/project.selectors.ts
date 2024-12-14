import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from '../project.state';

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

export const selectIsProjectLoaded = createSelector(
  selectProjectsState,
  (state) => state.isLoaded
);

export const selectLoading = createSelector(
  selectProjectsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProjectsState,
  (state) => state.error
);
