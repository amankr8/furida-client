import { createReducer, on } from '@ngrx/store';
import { initialProjectsState } from './project.state';
import {
  addProject,
  addProjectFail,
  addProjectSuccess,
  deleteProject,
  deleteProjectFail,
  deleteProjectSuccess,
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
} from './project.actions';

export const projectReducer = createReducer(
  initialProjectsState,
  on(loadProjects, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    loading: false,
  })),
  on(loadProjectsFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(addProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
    loading: false,
  })),
  on(addProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Delete Project
  on(deleteProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  // Delete Project Success
  on(deleteProjectSuccess, (state, { projectId }) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== projectId),
    loading: false,
  })),

  // Delete Project Fail
  on(deleteProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
