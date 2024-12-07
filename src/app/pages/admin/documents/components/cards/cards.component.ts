import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from '../../../../../service/document/document.service';
import { Document } from '../../../../../interface/document';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';
import { EditDocumentComponent } from '../../edit-document/edit-document.component';
import { ProjectService } from '../../../../../service/project/project.service';
import { Project } from '../../../../../interface/project';

@Component({
  selector: 'app-document-cards',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MenuButtonComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  documents: Document[] = [];
  projects: Project[] = [];
  isLoading = false;
  readonly editDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(
    private documentService: DocumentService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
    this.documentService.getAllDocuments().subscribe((data) => {
      this.documents = data;
      this.isLoading = false;
    });
  }

  getProjectNameById(id: number) {
    return this.projects.find((project) => project.id === id)?.name;
  }

  openEditDialog(id: number) {
    const editDialogref = this.editDialog.open(EditDocumentComponent, {
      data: this.documents.find((document) => document.id === id),
      width: '50%',
    });

    editDialogref.afterClosed().subscribe({
      next: (updatedDoc) => {
        if (!updatedDoc) return;
        this.isLoading = true;

        const docDto = new FormData();
        docDto.append('name', updatedDoc.name);
        docDto.append('desc', updatedDoc.desc);
        this.documentService.updateDocument(updatedDoc.id, docDto).subscribe({
          next: (res) => {
            const index = this.documents.findIndex(
              (document) => document.id === updatedDoc.id
            );
            this.documents[index] = updatedDoc;
            this.isLoading = false;
            this.snackBarRef.open('Document updated successfully!', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            this.snackBarRef.open(
              'Error: Failed to update document',
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

        this.documentService.deleteDocument(id).subscribe({
          next: (res) => {
            this.documents = this.documents.filter((doc) => doc.id !== id);
            this.isLoading = false;
            this.snackBarRef.open('Document deleted successfully!', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBarRef.open(
              'Error: Failed to delete document',
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
