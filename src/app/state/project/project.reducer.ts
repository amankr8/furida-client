import { createReducer, on } from '@ngrx/store';
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
  updateProject,
  updateProjectFail,
  updateProjectSuccess,
} from './project.actions';
import { Project } from '../../interface/project';

export interface ProjectState {
  projects: Project[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialProjectsState: ProjectState = {
  projects: [],
  isLoaded: false,
  loading: false,
  error: null,
};

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
    isLoaded: true,
    loading: false,
  })),

  on(loadProjectsFail, (state, { error }) => ({
    ...state,
    error,
    isLoaded: false,
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

  on(updateProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(updateProjectSuccess, (state, { project }) => ({
    ...state,
    projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    loading: false,
  })),

  on(updateProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(deleteProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deleteProjectSuccess, (state, { projectId }) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== projectId),
    loading: false,
  })),

  on(deleteProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
