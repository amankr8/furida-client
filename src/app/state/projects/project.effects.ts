import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../../service/project/project.service';
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
          catchError((error) => of(addProjectFail({ error: error.message })))
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
        tap(({ error }) => {
          this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      mergeMap(({ projectId }) =>
        this.projectService.deleteProject(projectId).pipe(
          map(() => deleteProjectSuccess({ projectId })),
          catchError((error) => of(deleteProjectFail({ error: error.message })))
        )
      )
    )
  );

  deleteProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProjectSuccess),
        tap(() => {
          this.snackBar.open('Project deleted successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  deleteProjectFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProjectFail),
        tap(({ error }) => {
          this.snackBar.open(`Failed to delete: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
