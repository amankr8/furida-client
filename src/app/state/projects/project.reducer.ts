import { createReducer, on } from '@ngrx/store';
import { initialProjectsState } from './project.state';
import {
  addProjectFail,
  addProjectSuccess,
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
} from './project.actions';

export const projectReducer = createReducer(
  initialProjectsState,
  on(loadProjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    loading: false,
    projects,
  })),
  on(loadProjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
  })),
  on(addProjectFail, (state, { error }) => ({
    ...state,
    error,
  }))
);
