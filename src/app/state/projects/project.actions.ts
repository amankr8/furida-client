import { createAction, props } from '@ngrx/store';
import { Project } from '../../interface/project';

export const loadProjects = createAction('[Projects] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const loadProjectsFail = createAction(
  '[Projects] Load Projects Fail',
  props<{ error: string }>()
);

export const addProject = createAction(
  '[Projects] Add Project',
  props<{ project: Project }>()
);

export const addProjectSuccess = createAction(
  '[Projects] Add Project Success',
  props<{ project: Project }>()
);

export const addProjectFail = createAction(
  '[Projects] Add Project Fail',
  props<{ error: string }>()
);
