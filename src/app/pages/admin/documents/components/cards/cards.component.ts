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
  isLoading = false;
  readonly editDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.isLoading = true;
    this.documentService.getAllDocuments().subscribe((data) => {
      this.documents = data;
      this.isLoading = false;
    });
  }
}
