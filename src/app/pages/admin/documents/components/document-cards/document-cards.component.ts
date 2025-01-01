import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Document } from '../../../../../interface/document';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDocuments,
  selectDocumentLoaded,
  selectDocumentLoading,
} from '../../../../../state/document/document.selectors';
import {
  selectProjectLoaded,
  selectProjectById,
  selectProjects,
} from '../../../../../state/project/project.selectors';
import {
  loadDocuments,
  openDocDeleteDialog,
  openDocEditDialog,
} from '../../../../../state/document/document.actions';
import { loadProjects } from '../../../../../state/project/project.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-document-cards',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MenuButtonComponent,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './document-cards.component.html',
  styleUrl: './document-cards.component.scss',
})
export class DocumentCardsComponent {
  @Input() documents$!: Observable<Document[]>;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);

  constructor(private store: Store) {}

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }

  updateDoc(id: number) {
    this.store.dispatch(openDocEditDialog({ documentId: id }));
  }

  deleteDoc(id: number) {
    this.store.dispatch(openDocDeleteDialog({ documentId: id }));
  }
}
