import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../../service/project/project.service';
import {
  addProject,
  addProjectFail,
  addProjectSuccess,
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
} from './project.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Project } from '../../interface/project';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      mergeMap(() =>
        this.projectService.getAllProjects().pipe(
          map((projects) => loadProjectsSuccess({ projects })),
          catchError((error) => of(loadProjectsFail({ error: error.message })))
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      mergeMap(({ project }) =>
        this.projectService.addProject(project).pipe(
          map((newProject: Project) =>
            addProjectSuccess({ project: newProject })
          ),
          catchError((error) => of(addProjectFail({ error: error.message })))
        )
      )
    )
  );
}
