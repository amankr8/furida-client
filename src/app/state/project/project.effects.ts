import { inject, Injectable } from '@angular/core';
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
  openDeleteDialog,
  openEditDialog,
  updateProject,
  updateProjectFail,
  updateProjectSuccess,
} from '../../state/project/project.actions';
import { catchError, first, map, mergeMap, of, tap } from 'rxjs';
import { Project } from '../../interface/project';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { Action, Store } from '@ngrx/store';
import { UpdateProjectComponent } from '../../pages/admin/projects/update-project/update-project.component';
import { selectProjectById } from './project.selectors';

@Injectable()
export class ProjectEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
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

  openEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openEditDialog),
        mergeMap(({ projectId }) =>
          this.store.select(selectProjectById(projectId)).pipe(
            first(),
            map((project) => {
              if (project) {
                this.showEditFormDialog(project);
              } else {
                console.error('Project not found in state');
              }
            })
          )
        )
      ),
    { dispatch: false }
  );

  showEditFormDialog(project: Project) {
    this.matDialog.open(UpdateProjectComponent, {
      panelClass: 'custom-dialog-container',
      data: project,
    });
  }

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      mergeMap(({ project }) =>
        this.projectService.updateProject(project.id, project).pipe(
          map((newProject: Project) =>
            updateProjectSuccess({ project: newProject })
          ),
          catchError((error) => of(updateProjectFail({ error: error.message })))
        )
      )
    )
  );

  updateProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProjectSuccess),
        tap(() => {
          this.router.navigate(['/admin/projects']);
          this.snackBar.open('Project updated successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  updateProjectFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProjectFail),
        tap(({ error }) => {
          this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  openDeleteDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openDeleteDialog),
        tap(({ projectId }) => {
          this.showDeleteWarningDialog(deleteProject({ projectId }));
        })
      ),
    { dispatch: false }
  );

  showDeleteWarningDialog(action: Action) {
    this.matDialog.open(ConfirmDialogComponent, {
      panelClass: 'alert-dialog-container',
      data: {
        action: action,
        message: 'Are you sure you want to delete this project?',
      },
    });
  }

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      mergeMap(({ projectId }) =>
        this.projectService.deleteProject(projectId).pipe(
          map(() => deleteProjectSuccess({ projectId })),
          catchError((error) =>
            of(
              deleteProjectFail({
                error: this.getDeleteProjectErrorMessage(error),
              })
            )
          )
        )
      )
    )
  );

  getDeleteProjectErrorMessage(error: any): string {
    switch (error.status) {
      case 403:
        return 'Project is linked to a document. Unlink the document first';
      case 404:
        return 'Project does not exist. Please refresh the page';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Unknown Error Occurred';
    }
  }

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
          this.snackBar.open(`Failed: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
