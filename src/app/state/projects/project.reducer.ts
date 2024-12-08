import { createReducer, on } from '@ngrx/store';
import { initialProjectsState } from './project.state';
import {
  addProject,
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
  on(addProject, (state) => ({
    ...state,
    loading: true,
  })),
  on(addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
    loading: false,
  })),
  on(addProjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
