import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../../../../interface/project';
import { ProjectService } from '../../../../../service/project/project.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';
import { UpdateProjectComponent } from '../../update-project/update-project.component';

@Component({
  selector: 'app-project-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  projects: Project[] = [];
  isLoading = false;
  readonly editDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
      this.isLoading = false;
    });
  }

  openEditDialog(id: number) {
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

  openDeleteDialog(id: number) {
    const deleteDialogref = this.deleteDialog.open(DeleteDialogComponent, {
      data: id,
      width: '50%',
    });

    deleteDialogref.afterClosed().subscribe({
      next: (id) => {
        if (!id) return;
        this.isLoading = true;

        this.projectService.deleteProject(id).subscribe({
          next: (res) => {
            this.projects = this.projects.filter(
              (project) => project.id !== id
            );
            this.isLoading = false;
            this.snackBarRef.open('Project deleted successfully!', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBarRef.open(
              'Error: Failed to delete project',
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
}
