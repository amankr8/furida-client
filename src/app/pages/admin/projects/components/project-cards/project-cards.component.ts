import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../../../../interface/project';
import { ProjectService } from '../../../../../service/project/project.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProjectComponent } from '../../update-project/update-project.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  openDeleteDialog,
  loadProjects,
} from '../../../../../store/actions/project.actions';
import {
  selectProjects,
  selectLoading,
  selectError,
} from '../../../../../store/selectors/project.selectors';

@Component({
  selector: 'app-project-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './project-cards.component.html',
  styleUrl: './project-cards.component.scss',
})
export class ProjectCardsComponent {
  projects$: Observable<Project[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  projects: Project[] = [];
  isLoading = false;
  readonly editDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(private projectService: ProjectService, private store: Store) {
    this.projects$ = this.store.select(selectProjects);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadProjects());
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
      this.isLoading = false;
    });
  }

  updateProject(id: number) {
    const editDialogref = this.editDialog.open(UpdateProjectComponent, {
      data: this.projects.find((project) => project.id === id),
      width: '50%',
    });

    editDialogref.afterClosed().subscribe({
      next: (updatedProject) => {
        if (!updatedProject) return;
        this.isLoading = true;

        this.projectService
          .updateProject(updatedProject.id, updatedProject)
          .subscribe({
            next: (res) => {
              const index = this.projects.findIndex(
                (project) => project.id === updatedProject.id
              );
              this.projects[index] = updatedProject;
              this.isLoading = false;
              this.snackBarRef.open(
                'Project updated successfully!',
                'Dismiss',
                {
                  duration: 3000,
                }
              );
            },
            error: (err) => {
              console.error(err);
              this.snackBarRef.open(
                'Error: Failed to update project',
                'Dismiss',
                {
                  duration: 3000,
                }
              );
            },
          });
      },
    });
  }

  deleteProject(id: number) {
    this.store.dispatch(openDeleteDialog({ projectId: id }));
  }
}
