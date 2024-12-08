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

export const openEditDialog = createAction(
  '[Project] Open Edit Dialog',
  props<{ project: Project }>()
);

export const updateProject = createAction(
  '[Projects] Update Project',
  props<{ project: Project }>()
);

export const updateProjectSuccess = createAction(
  '[Projects] Update Project Success',
  props<{ project: Project }>()
);

export const updateProjectFail = createAction(
  '[Projects] Update Project Fail',
  props<{ error: string }>()
);

export const openDeleteDialog = createAction(
  '[Project] Open Delete Dialog',
  props<{ projectId: number }>()
);

export const deleteProject = createAction(
  '[Project] Delete Project',
  props<{ projectId: number }>()
);

export const deleteProjectSuccess = createAction(
  '[Project] Delete Project Success',
  props<{ projectId: number }>()
);

export const deleteProjectFail = createAction(
  '[Project] Delete Project Fail',
  props<{ error: string }>()
);
