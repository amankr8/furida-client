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
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Project } from '../../interface/project';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar
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
          catchError((error) =>
            of(addProjectFail({ error: 'Error: Failed to add project' }))
          )
        )
      )
    )
  );

  addProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProjectSuccess),
        tap(() => {
          this.router.navigate(['/admin/projects']);
          this.snackBar.open('Project created successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  addProjectFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProjectFail),
        tap(() => {
          this.snackBar.open('Error: Failed to add project!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
